import { useState } from "react";
import axios from "axios";

const Forgot = () => {
  const [email, setEmail] = useState("");
  const [messageStatus, setMessageStatus] = useState(0);

  const sendMessage = async (e) => {
    e.preventDefault();

    setMessageStatus(1);

    // console.log("HELLO: ", e.target.email.value)

    // let response = await fetch(
    //   "https://admin.rbcommunity.org/auth/forgot-password",
    //   {
    //     email: e.target.email.value,
    //   }
    // );

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
      renderAction = <div>Sending you a reset link...</div>;
      break;
    case 2:
      renderAction = <div>Reset link sent. Check your email to continue.</div>;
      break;
    default:
      renderAction = (
        <form onSubmit={sendMessage}>
          <div>
            <label htmlFor="email">Email address </label>
            <input type="email" name="email" id="email" />
          </div>
          <button>Submit</button>
        </form>
      );
      break;
  }

  if (messageStatus === 0) {
  }

  return <>{renderAction}</>;
};

export default Forgot;
