"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { useAuth, SignInButton } from "@clerk/nextjs";

type ServiceKey = "wash_dry" | "dry_clean" | "press" | "fold";

// Services now use days as base estimate and include a unit label/capacity for UX
const SERVICES: Record<ServiceKey, { label: string; baseDays: number; price: number; unitLabel: string; unitCapacity: string }> = {
  wash_dry: { label: "Wash & Dry", baseDays: 1, price: 5, unitLabel: "load (30 lb)", unitCapacity: "30 lbs" },
  dry_clean: { label: "Dry Clean", baseDays: 2, price: 12, unitLabel: "bundle (5 articles)", unitCapacity: "5 articles" },
  press: { label: "Steam Press", baseDays: 2, price: 2, unitLabel: "batch (10 articles)", unitCapacity: "10 articles" },
  fold: { label: "Fold & Pack", baseDays: 1, price: 1, unitLabel: "load (30 lb)", unitCapacity: "30 lbs" },
};

export default function CustomerOrdersPage() {
  const { isSignedIn /*, userId */ } = useAuth();

  const [quantities, setQuantities] = useState<Record<ServiceKey, number>>({
    wash_dry: 0,
    dry_clean: 0,
    press: 0,
    fold: 0,
  });

  type OrderItem = { service: ServiceKey | string; qty: number; label: string };
  type OrderRecord = {
    id: number | string;
    created_at?: string;
    total?: number;
    items?: OrderItem[];
    status?: string;
    company?: string | null;
    estimated_minutes?: number | null;
  };

  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [, setError] = useState<string | null>(null);
  // New UI state for the order creator + cart
  const [scheduledDate, setScheduledDate] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1); // default to tomorrow
    return d.toISOString().slice(0, 10);
  });
  // company for whom the order is being placed (optional but stored)
  const [company, setCompany] = useState<string>("");

  type CartItem = { id: string; date: string; items: Array<{ service: ServiceKey; qty: number; label: string }>; total: number; estimated_days?: number; estimated_minutes?: number; status: "unpaid" | "paid"; company?: string | null };
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

   
   
  const fetchOrders = useCallback(async () => {
    if (!isSignedIn) return;
    setLoadingOrders(true);
    try {
      const res = await fetch("/api/orders");
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to fetch orders");
      setOrders(data.orders || []);
    } catch (err) {
      console.error(err);
      setError((err as Error).message);
    } finally {
      setLoadingOrders(false);
    }
  }, [isSignedIn]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // async function fetchOrders() {
  // }

  /*
  async function createOrderBackend(items: OrderItem[], total: number, estimated_minutes: number) {
    // create order on backend (this was the previous flow)
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, total, estimated_minutes, company }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to create order");
      // refresh
      await fetchOrders();
      return data;
    } catch (err) {
      console.error(err);
      setError((err as Error).message);
      throw err;
    }
  }
  */

  // Estimate in days (services can be done concurrently: take the max per-service baseDays)
  const estimateDays = useMemo(() => {
    let totalUnits = 0;
    let maxServiceDays = 0;
    for (const k of Object.keys(quantities) as ServiceKey[]) {
      const q = quantities[k] || 0;
      totalUnits += q;
      if (q > 0) maxServiceDays = Math.max(maxServiceDays, SERVICES[k].baseDays);
    }
    if (totalUnits === 0) return 0;

    // scale with thresholds
    let scaled = maxServiceDays;
    if (totalUnits >= 20) scaled = Math.max(scaled, 14);
    else if (totalUnits >= 10) scaled = Math.max(scaled, 10);
    else if (totalUnits >= 5) scaled = Math.max(scaled, 5);

    return scaled;
  }, [quantities]);

  const totalPrice = useMemo(() => {
    let p = 0;
    for (const k of Object.keys(quantities) as ServiceKey[]) {
      const q = quantities[k] || 0;
      p += q * SERVICES[k].price;
    }
    return p;
  }, [quantities]);

  function updateQty(key: ServiceKey, value: number) {
    setQuantities(prev => ({ ...prev, [key]: Math.max(0, Math.floor(value)) }));
  }

  function resetCreator() {
    setQuantities({ wash_dry: 0, dry_clean: 0, press: 0, fold: 0 });
    const d = new Date(); d.setDate(d.getDate() + 1); setScheduledDate(d.toISOString().slice(0,10));
    setError(null);
  }

  /*
  function estimatedCompletionFromDate(dateISO: string, days: number) {
    if (!dateISO || !days) return "—";
    const scheduled = new Date(dateISO);
    const then = new Date(scheduled);
    then.setDate(then.getDate() + days);
    return then.toLocaleDateString();
  }
  */

  /*
  async function handlePlaceOrder() {
    setError(null);
    if (!isSignedIn) {
      setError("Please sign in to place orders.");
      return;
    }

    const items = Object.entries(quantities)
      .filter(([, qty]) => qty > 0)
      .map(([k, qty]) => ({ service: k, qty, label: SERVICES[k as ServiceKey].label }));

    if (items.length === 0) {
      setError("Add at least one item to place an order.");
      return;
    }

    setSubmitting(true);
    try {
      const minutesForBackend = estimateDays * 24 * 60;
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, total: totalPrice, estimated_minutes: minutesForBackend }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to create order");
      // clear form
      setQuantities({ wash_dry: 0, dry_clean: 0, press: 0, fold: 0 });
      // refresh orders
      await fetchOrders();
    } catch (err) {
      console.error(err);
      setError((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  }
  */

  // Confirm from the creator: adds a cart item (unpaid). Placeholder for checkout integration.
  function handleConfirmToCart() {
    setError(null);
    const items = Object.entries(quantities)
      .filter(([, qty]) => qty > 0)
      .map(([k, qty]) => ({ service: k as ServiceKey, qty, label: SERVICES[k as ServiceKey].label }));
    if (items.length === 0) {
      setError("Add at least one service before confirming.");
      return;
    }
  const total = items.reduce((s, it) => s + it.qty * SERVICES[it.service].price, 0);
  // compute estimated days using same logic (concurrent services)
  const totalUnits = items.reduce((s, it) => s + it.qty, 0);
  const maxServiceDays = items.reduce((s, it) => Math.max(s, SERVICES[it.service].baseDays), 0);
  let estDays = maxServiceDays;
  if (totalUnits >= 20) estDays = Math.max(estDays, 14);
  else if (totalUnits >= 10) estDays = Math.max(estDays, 10);
  else if (totalUnits >= 5) estDays = Math.max(estDays, 5);
  const estimated_minutes = estDays * 24 * 60;
  const id = `cart_${Date.now()}`;
  const newItem: CartItem = { id, date: scheduledDate, items, total, estimated_days: estDays, estimated_minutes, status: "unpaid", company: company ?? null };
    setCartItems(prev => [newItem, ...prev]);
    resetCreator();
  }

  // Placeholder pay flow: mark as paid and create backend order (for now this stands in for Stripe)
  /*
  async function handlePay(cartId: string) {
    const ci = cartItems.find(c => c.id === cartId);
    if (!ci) return;
    try {
      setSubmitting(true);
  // In real flow, redirect to Stripe checkout. For now, mark paid and create order record.
  const minutesForBackend = (ci.estimated_minutes ?? (ci.estimated_days ? ci.estimated_days * 24 * 60 : 0));
  await createOrderBackend(ci.items.map(it => ({ service: it.service, qty: it.qty, label: it.label })), ci.total, minutesForBackend);
      setCartItems(prev => prev.map(c => c.id === cartId ? { ...c, status: "paid" } : c));
    } catch (err) {
      // error already set by createOrderBackend
    } finally {
      setSubmitting(false);
    }
  }
  */

  // Global pay: process all unpaid cart items - redirect to Stripe Checkout
  async function handlePayAll() {
    const unpaid = cartItems.filter(c => c.status === "unpaid");
    if (unpaid.length === 0) {
      setError("No unpaid items to pay for.");
      return;
    }

    try {
      setSubmitting(true);
      // Prepare payload: send unpaid cart items to Stripe Checkout
      // Ensure company is present on cart items (if set in creator)
      const cartToSend: CartItem[] = unpaid.map(c => ({ ...c, company: c.company ?? company ?? null }));
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart: cartToSend }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to start checkout");

      // redirect user to Stripe Checkout
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No redirect URL returned from checkout");
      }
    } catch (err) {
      console.error(err);
      setError((err as Error).message);
      setSubmitting(false);
    }
  }

  if (!isSignedIn)
    return (
      <div className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="max-w-lg w-full glass-card p-6 rounded-lg shadow-glow animate-fadeInUp">
          <h2 className="text-2xl font-bold mb-4 text-gradient-multi">Sign in to place orders</h2>
          <p className="text-gray-200 mb-4">Please sign in to create and view your laundry orders.</p>
          <SignInButton mode="modal">
            <button className="btn-modern px-4 py-2 bg-blue-600 text-white rounded">Sign in</button>
          </SignInButton>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gradient-multi">Place a Laundry Order</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Order creator (calendar + service selector + confirm/decline) */}
          <div className="glass-card p-6 rounded-2xl shadow-2xl">
            <h2 className="text-xl font-semibold mb-4 text-purple-300">Schedule Service</h2>
            <div className="mb-4">
              <label className="block text-sm text-gray-200 mb-2">Select date</label>
              <input type="date" value={scheduledDate} onChange={e => setScheduledDate(e.target.value)} className="w-full p-3 rounded bg-white/90 text-black" />
            </div>

            <div className="mb-4">
              <label className="block text-sm text-gray-200 mb-2">Company (who this order is for)</label>
              <input type="text" value={company} onChange={e => setCompany(e.target.value)} placeholder="Company name (optional)" className="w-full p-3 rounded bg-white/90 text-black" />
            </div>

            <div className="mb-4">
              <h3 className="font-semibold mb-2 text-gray-100">Choose services</h3>
              <div className="grid gap-3">
                {(Object.keys(SERVICES) as ServiceKey[]).map(k => (
                  <label key={k} className="flex items-center justify-between p-3 bg-white/5 rounded">
                    <div>
                      <div className="font-medium text-white">{SERVICES[k].label}</div>
                      <div className="text-sm text-gray-300">${SERVICES[k].price} each • {SERVICES[k].unitCapacity} per unit</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="inline-flex items-center bg-white/90 rounded overflow-hidden">
                        <button
                          type="button"
                          aria-label={`Decrease ${SERVICES[k].label}`}
                          onClick={() => updateQty(k, (quantities[k] || 0) - 1)}
                          disabled={(quantities[k] || 0) <= 0}
                          className={`px-3 py-2 text-lg ${ (quantities[k] || 0) <= 0 ? 'text-gray-400' : 'text-gray-800 hover:bg-white/100' }`}
                        >
                          −
                        </button>
                        <div className="px-4 py-2 w-16 text-center font-mono text-black">{quantities[k] || 0}</div>
                        <button
                          type="button"
                          aria-label={`Increase ${SERVICES[k].label}`}
                          onClick={() => updateQty(k, (quantities[k] || 0) + 1)}
                          className="px-3 py-2 text-lg text-gray-800 hover:bg-white/100"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <p className="text-gray-200">Price: <span className="font-semibold">${totalPrice.toFixed(2)}</span></p>
              <p className="text-gray-200">Estimated work time: <span className="font-semibold">{estimateDays} day{estimateDays !== 1 ? 's' : ''}</span></p>
            </div>

            <div className="flex items-center gap-3">
              <button onClick={handleConfirmToCart} className="px-6 py-2 bg-gradient-modern text-white rounded-xl shadow-glow">Confirm</button>
              <button onClick={resetCreator} className="px-4 py-2 bg-white/5 text-white rounded">Decline</button>
            </div>
          </div>

          {/* Right: Top - requested services; Bottom - estimated pickup time */}
          <div className="flex flex-col gap-6">
            <div className="glass-card p-4 rounded-2xl shadow-sm">
              <h3 className="font-semibold text-lg text-white mb-3">Requested Services</h3>
              {cartItems.length === 0 ? (
                <p className="text-gray-300">No services requested yet. Confirm a selection on the left to add it here.</p>
              ) : (
                <div className="space-y-3">
                  {cartItems.map(ci => (
                    <div key={ci.id} className="p-3 bg-white/5 rounded flex justify-between items-start">
                      <div>
                        <div className="font-medium text-white">Scheduled: {new Date(ci.date).toLocaleDateString()}</div>
                        <div className="text-sm text-gray-300">Items:</div>
                        <ul className="ml-4 text-sm text-gray-300 list-disc">
                          {ci.items.map((it, idx) => (
                            <li key={idx}>{it.label} — {it.qty} × {SERVICES[it.service].unitCapacity}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-white">${ci.total.toFixed(2)}</div>
                        <div className="text-sm text-gray-300">{ci.status === 'paid' ? 'Paid' : 'Awaiting payment'}</div>
                        <div className="text-sm text-gray-300">Est. time: {ci.estimated_days ?? Math.ceil((ci.estimated_minutes ?? 0) / (24*60))} day{(ci.estimated_days ?? Math.ceil((ci.estimated_minutes ?? 0) / (24*60))) !== 1 ? 's' : ''}</div>
                        <div className="mt-2">
                          {ci.status === 'unpaid' ? (
                            <span className="text-sm text-yellow-300">Awaiting payment</span>
                          ) : (
                            <span className="text-sm text-green-300">Completed</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="glass-card p-4 rounded-2xl shadow-sm">
              <h3 className="font-semibold text-lg text-white mb-2">Estimated Pickup Time</h3>
              <p className="text-gray-300">Based on selected services and scheduled date.</p>
              <div className="mt-3 text-white font-medium">
                {/* compute a simple pickup range: next day to two weeks depending on heaviest service */}
                {(() => {
                  if (cartItems.length === 0) return <span className="text-gray-300">No scheduled services</span>;
                  const ci = cartItems[0];
                  const days = ci.estimated_days ?? Math.ceil((ci.estimated_minutes ?? 0) / (24*60));
                  const scheduled = new Date(ci.date);
                  const earliest = new Date(scheduled);
                  earliest.setDate(earliest.getDate() + 1);
                  const latest = new Date(scheduled);
                  latest.setDate(latest.getDate() + Math.min(14, Math.max(1, days)));
                  return <span>{earliest.toLocaleDateString()} — {latest.toLocaleDateString()}</span>;
                })()}
              </div>
            </div>
          </div>
        </div>

  {/* Existing orders list (historical) below */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4 text-white">Your Orders</h2>
          {loadingOrders ? (
            <p className="text-gray-300">Loading orders…</p>
          ) : orders.length === 0 ? (
            <p className="text-gray-300">You have no orders yet.</p>
          ) : (
            <div className="space-y-4">
              {orders.map(o => (
                <div key={o.id} className="p-4 glass-card rounded-lg card-hover-lift animate-fadeInUp">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-semibold">Order #{o.id}</p>
                      <p className="text-sm text-gray-200">Placed: {o.created_at ? new Date(o.created_at).toLocaleString() : '—'}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${o.total?.toFixed?.(2) ?? o.total}</p>
                      <p className="text-sm text-gray-200">Status: {o.status}</p>
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-gray-200">
                    <strong>Items:</strong>
                    <ul className="list-disc ml-6">
                      {(o.items || []).map((it: OrderItem, i: number) => (
                        <li key={i}>{it.label} — {it.qty} pcs</li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-2 text-sm text-gray-200">Company: {o.company ?? '—'}</div>
                  <div className="mt-2 text-sm text-gray-300">Estimated time: {o.estimated_minutes ? Math.ceil(o.estimated_minutes / (24*60)) : '—'} day{(o.estimated_minutes ? Math.ceil(o.estimated_minutes / (24*60)) : 0) !== 1 ? 's' : ''}</div>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Floating pay action (bottom-right) for all unpaid cart items */}
        <div className="fixed bottom-6 right-6 z-50">
          <button onClick={handlePayAll} disabled={submitting || cartItems.every(c => c.status === 'paid')} className="px-5 py-3 bg-gradient-modern text-white rounded-full shadow-glow">
            {submitting ? 'Processing...' : `Pay All (${cartItems.filter(c => c.status === 'unpaid').length})`}
          </button>
        </div>
      </div>
    </div>
  );
}
