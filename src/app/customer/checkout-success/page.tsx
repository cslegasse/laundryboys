import CheckoutSuccessClient from "./CheckoutSuccessClient";

export default async function Page({ searchParams }: { searchParams: Promise<{ session_id?: string }> }) {
  const params = await searchParams;
  const session_id = params?.session_id ?? null;

  return (
    <div>
      <CheckoutSuccessClient sessionId={session_id} />
    </div>
  );
}
