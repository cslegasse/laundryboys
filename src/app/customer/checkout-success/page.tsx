import CheckoutSuccessClient from "./CheckoutSuccessClient";

export default async function Page({ searchParams }: { searchParams: Promise<{ session_id?: string }> }) {
  const params = await searchParams;
  const session_id = params?.session_id ?? null;

  // Render a lightweight server component that mounts the client-side
  // completion UI. This avoids running client-only hooks during
  // prerendering/build time and prevents prerender errors.
  return (
    <div>
      <CheckoutSuccessClient sessionId={session_id} />
    </div>
  );
}
