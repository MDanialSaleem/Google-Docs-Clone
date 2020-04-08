import React from "react"
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import ForgotPassword from "./ForgotPassword";


export default () => {
  const SIGNIN = "signin";
  const SIGNUP = "signup";
  const FORGOTPASSWORD = "forgotPassword";
  const [screen, setScreen] = React.useState(SIGNIN);

  //the reason we declare variables here instead of binding them inline is for some
  //efficiency reasons. I am not quite sure about this, but just to be on the safe side.
  const setSignIn = event => {
    event.preventDefault();
    setScreen(SIGNIN);
  };
  const setSignUp = event => {
    event.preventDefault();
    setScreen(SIGNUP);
  };
  const setForgotPassword = event => {
    event.preventDefault();
    setScreen(FORGOTPASSWORD);
  };

  let screenToShow = null;
  switch (screen) {
    case SIGNIN:
      screenToShow = (
        <SignIn
          noAccountHandler={setSignUp}
          forgotPasswordHandler={setForgotPassword}
        />
      );
      break;
    case SIGNUP:
      screenToShow = <SignUp hasAccountHandler={setSignIn} />;
      break;
    case FORGOTPASSWORD:
      screenToShow = <ForgotPassword />;
      break;
    default:
      throw new Error("Undefined screen in signinup");
  }
  return (
      <>
      {screenToShow}
      </>
  );
};
