import { useEffect, useState } from "react";

import Head from "next/head";
import { Inter } from "@next/font/google";
import CustomToolbar from "@/components/Navigation/Toolbar/Toolbar";
import { getSession } from "next-auth/react";

import ContactTable from "@/components/ContactTable/ContactTable";
import { Typography } from "@material-ui/core";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [userData, setUserData] = useState(null);
  const [leaderData, setLeaderData] = useState(null);

  useEffect(() => {
    async function getUserData() {
      let response = await getSession();
      response = await response;
      setUserData(response);
    }

    async function prepLeader() {
      let response = await getSession();
      response = await response;
      if (response) {
        const jwt = response.accessToken;

        let leaderResponse = await fetch(
          "https://admin.rbcommunity.org/leader-groups",
          {
            headers: { Authorization: `Bearer ${jwt}` },
          }
        );

        leaderResponse = await leaderResponse.json();

        leaderResponse[0].users.forEach((person) => {
          person.position = "Elder";
        });
        leaderResponse[1].users.forEach((person) => {
          person.position = "Deacon";
        });
        leaderResponse[2].users.forEach((person) => {
          person.position = "Staff";
        });

        let flattenedArray = leaderResponse[0].users
          .concat(leaderResponse[1].users)
          .concat(leaderResponse[2].users);

        setLeaderData(flattenedArray);
      }
    }

    getUserData();
    prepLeader();
  }, []);

  return (
    <>
      <Head>
        <title>RB Community Leader</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CustomToolbar />
      <main>
        {leaderData ? (
          <ContactTable contacts={leaderData} />
        ) : (
          <Typography>Welcome to RB Community Leader.  Login using the button in the top right.</Typography>
        )}
      </main>
    </>
  );
}
