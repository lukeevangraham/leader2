import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const Reset = () => {
  const [newPassword, setNewPassword] = useState();
  const [newPasswordConfirm, setNewPasswordConfirm] = useState();
  const router = useRouter();
  const { code } = router.query;

  const submitNewPassword = async (e) => {
    e.preventDefault();

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
      console.log("R: ", response);
    } catch (error) {
      console.log("E: ", error);
    }
  };

  let newPasswordForm;

  newPasswordForm = (
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

  return <div>{newPasswordForm}</div>;
};

export default Reset;
