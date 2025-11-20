import CheckoutSuccessClient from "./CheckoutSuccessClient";

export default function Page({ searchParams }: { searchParams?: { session_id?: string } }) {
  const session_id = searchParams?.session_id ?? null;

  // Render a lightweight server component that mounts the client-side
  // completion UI. This avoids running client-only hooks during
  // prerendering/build time and prevents prerender errors.
  return (
    <div>
      <CheckoutSuccessClient sessionId={session_id} />
    </div>
  );
}
