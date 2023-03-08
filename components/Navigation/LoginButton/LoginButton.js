import { useSession, signIn, signOut } from "next-auth/react";
import { Button, Typography } from "@mui/material";
import Link from "next/link";

export default function Component() {
  const { data: session } = useSession();
  const { data } = useSession();

  if (session) {
    return (
      <>
        <Typography sx={{ marginRight: "2rem" }}>
          Signed in as {session.user.email}
        </Typography>

        <Button onClick={() => signOut()} color="inherit">
          Logout
        </Button>
        {/* <button onClick={() => signOut()}>Sign out</button> */}
      </>
    );
  }
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
      <Link href="/forgot">
        <Typography sx={{ alignSelf: "center", justifyContent: "center" }}>
          Forgot password?
        </Typography>
      </Link>
      {/* <div>
        Not signed in <br />
      </div> */}
      <Button onClick={() => signIn()} color="inherit">
        Login
      </Button>
      {/* <button onClick={() => signIn()}>Sign in</button> */}
    </div>
  );
}
