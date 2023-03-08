import { useState } from "react";
import axios from "axios";
import CustomToolbar from "@/components/Navigation/Toolbar/Toolbar";
import { TextField, Button, Typography } from "@mui/material";

const Forgot = () => {
  const [email, setEmail] = useState("");
  const [messageStatus, setMessageStatus] = useState(0);

  const sendMessage = async (e) => {
    e.preventDefault();

    setMessageStatus(1);

    let response = await axios.post(
      "https://admin.rbcommunity.org/auth/forgot-password",
      {
        email: e.target.email.value,
      }
    );

    try {
      response = await response;

      if (response.status === 200) {
        console.log("WOW", response);
        setMessageStatus(2);
      }
    } catch (error) {
      console.log("E: ", error);
    }
  };

  let renderAction;

  switch (messageStatus) {
    case 1:
      renderAction = (
        <Typography>Sending you a password reset link...</Typography>
      );
      break;
    case 2:
      renderAction = (
        <Typography>
          Reset link sent. Check your email to finish resetting your password.
        </Typography>
      );
      break;
    default:
      renderAction = (
        <form onSubmit={sendMessage}>
          <div>
            {/* <label htmlFor="email">Email address </label>
            <input type="email" name="email" id="email" /> */}
            <TextField
              id="email"
              type="email"
              label="Email address"
              variant="outlined"
              sx={{ width: "20rem" }}
            />
          </div>
          <Button onclick="submit" sx={{ marginTop: "1rem" }} type="submit">
            Submit
          </Button>
          {/* <button
            style={{
              marginTop: "1rem",
              border: "none",
              padding: ".5rem 1.5rem",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Submit
          </button> */}
        </form>
      );
      break;
  }

  if (messageStatus === 0) {
  }

  return (
    <>
      <CustomToolbar />
      {renderAction}
    </>
  );
};

export default Forgot;
