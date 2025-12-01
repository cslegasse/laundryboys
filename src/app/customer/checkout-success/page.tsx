import CheckoutSuccessClient from "./CheckoutSuccessClient";

export default function Page({ searchParams }: { searchParams?: { session_id?: string } }) {
  const session_id = searchParams?.session_id ?? null;

  return (
    <div>
      <CheckoutSuccessClient sessionId={session_id} />
    </div>
  );
}
