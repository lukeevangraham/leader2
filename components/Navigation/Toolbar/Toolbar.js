import LoginButton from "../LoginButton/LoginButton";
import { AppBar, Toolbar, Typography } from "@mui/material";
import Link from "next/link";

import classes from "./Toolbar.module.css"

const CustomToolbar = () => {
  return (
    <>
      <AppBar position="static" sx={{ marginBottom: "2rem" }} className={classes.App}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link href="/">RB Community Leader</Link>
          </Typography>
          <LoginButton />
        </Toolbar>
      </AppBar>
    </>
  );
};

export default CustomToolbar;
