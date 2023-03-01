import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

export default function Component() {
  const { data: session } = useSession();
  const { data } = useSession();

  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <div style={{ display: "flex", gap: "1rem" }}>
      <div>
        Not signed in <br />
      </div>
      <button onClick={() => signIn()}>Sign in</button>
      <Link href="/forgot">I forgot my password</Link>
    </div>
  );
}
