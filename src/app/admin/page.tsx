"use client";

import { useEffect, useState } from "react";
import axios from "axios";

type Order = {
  id: string;
  customer_name: string;
  status: "pending" | "completed" | "cancelled";
  total: number;
  created_at: string;
};

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await axios.get<{ orders: Order[] }>("/api/admin/orders");
        setOrders(res.data.orders);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    }
    fetchOrders();
  }, []);

  // Metrics
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === "pending").length;
  const revenue = orders.reduce((acc, o) => acc + o.total, 0);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Total Orders: {totalOrders}</p>
      <p>Pending Orders: {pendingOrders}</p>
      <p>Total Revenue: ${revenue}</p>

      <table>
        <thead>
          <tr>
            <th>Customer</th>
            <th>Status</th>
            <th>Total</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(o => (
            <tr key={o.id}>
              <td>{o.customer_name}</td>
              <td>{o.status}</td>
              <td>${o.total}</td>
              <td>{new Date(o.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
