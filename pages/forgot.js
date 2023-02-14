import { useState } from "react";

const Forgot = () => {
  const [email, setEmail] = useState("");
  const [messageStatus, setMessageStatus] = useState();

  const sendMessage = async (e) => {
    e.preventDefault();

    setMessageStatus(1);

    // console.log("HELLO: ", e.target.email.value)

    let response = await fetch(
      "https://admin.rbcommunity.org/auth/forgot-password",
      {
        email: e.target.email.value,
      }
    );

    response = await response.json();
    console.log("Hello: ",response)
  };

  return (
    <form onSubmit={sendMessage}>
      <div>
        <label htmlFor="email">Email address </label>
        <input type="email" name="email" id="email" />
      </div>
      <button>Submit</button>
    </form>
  );
};

export default Forgot;
