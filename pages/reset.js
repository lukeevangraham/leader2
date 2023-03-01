import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";

const Reset = () => {
  const [messageStatus, setMessageStatus] = useState(0);

  const router = useRouter();
  const { code } = router.query;

  const submitNewPassword = async (e) => {
    e.preventDefault();

    // MAKING SURE THE CONFIRM PASSWORD MATCHES THE FIRST PASSWORD
    if (e.target.newPassword.value === e.target.newPasswordConfirm.value) {
      setMessageStatus(4);

      let response = await axios.post(
        `https://admin.rbcommunity.org/auth/reset-password`,
        {
          code: code,
          password: e.target.newPassword.value,
          passwordConfirmation: e.target.newPasswordConfirm.value,
        }
      );

      try {
        response = await response;
        response.status === 200 ? setMessageStatus(1) : setMessageStatus(2);
        console.log("R: ", response);
      } catch (error) {
        console.log("E: ", error);
        setMessageStatus(2)
      }
    } else {
      console.log("uh oh");
      setMessageStatus(3);
    }
  };

  const defaultPasswordForm = (
    <form onSubmit={submitNewPassword}>
      <div>
        <label htmlFor="newPassword">New Password</label>
        <input type="password" name="newPassword" id="newPassword" />
      </div>
      <div>
        <label htmlFor="newPassword">Confirm New Password</label>
        <input
          type="password"
          name="newPasswordConfirm"
          id="newPasswordConfirm"
        />
      </div>
      <button>Submit</button>
    </form>
  );

  let newPasswordForm;

  switch (messageStatus) {
    case 1:
      newPasswordForm = (
        <div>
          Your password has been reset.{" "}
          <Link href={`/api/auth/signin?callbackUrl=${process.env.NEXT_PUBLIC_NEXTAUTH_URL}`}>Click here to log in with that new password.</Link>
        </div>
      );
      break;
    case 2:
      newPasswordForm = (
        <div>Uh oh, something unusual happened. Perhaps try again?</div>
      );
      break;
    case 3:
      newPasswordForm = (
        <>
          <div>
            Your passwords do not match. Please try entering the password again.
          </div>
          <br />
          {defaultPasswordForm}
        </>
      );
      break;
    case 4:
      newPasswordForm = <div>Resetting...</div>;
      break;
    default:
      newPasswordForm = defaultPasswordForm;
      break;
  }

  return <div>{newPasswordForm}</div>;
};

export default Reset;
