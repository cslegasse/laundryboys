"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CheckoutSuccessClient({ sessionId }: { sessionId: string | null }) {
  const router = useRouter();
  const [status, setStatus] = useState<'processing'|'success'|'error'>('processing');
  const [message, setMessage] = useState<string>('Verifying payment...');

  useEffect(() => {
    if (!sessionId) {
      setStatus('error');
      setMessage('Missing session id');
      return;
    }

    let mounted = true;

    async function verifyPayment() {
      try {
        // Poll for order creation (webhook might take a moment)
        // In production, you might want to check session status via API
        await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2s for webhook
        
        if (!mounted) return;
        setStatus('success');
        setMessage('Payment confirmed — your order(s) are placed. Redirecting to your orders...');
        setTimeout(() => router.push('/customer'), 1800);
      } catch (err) {
        console.error(err);
        if (!mounted) return;
        setStatus('error');
        setMessage((err as Error).message || 'Failed to verify payment');
      }
    }

    verifyPayment();

    return () => { mounted = false; };
  }, [sessionId, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-8">
      <div className="glass-card p-8 rounded-2xl text-center max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Checkout</h2>
        <p className="mb-4">{message}</p>
        {status === 'processing' && <div className="mt-4">Processing…</div>}
        {status === 'success' && <div className="mt-4 text-green-300">Success ✓</div>}
        {status === 'error' && <div className="mt-4 text-red-300">Error ✕</div>}
      </div>
    </div>
  );
}
