import React from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

export default () => {
    const SIGNIN = "signin";
    const SIGNUP = "signup";
    const [screen, setScreen] = React.useState(SIGNIN);

    //the reason we declare variables here instead of binding them inline is for some
    //efficiency reasons. I am not quite sure about this, but just to be on the safe side.
    const setSignIn = (event) => {
        event.preventDefault();
        setScreen(SIGNIN);
    };
    const setSignUp = (event) => {
        event.preventDefault();
        setScreen(SIGNUP);
    };
    let screenToShow = null;
    switch (screen) {
        case SIGNIN:
            screenToShow = <SignIn noAccountHandler={setSignUp} />;
            break;
        case SIGNUP:
            screenToShow = <SignUp hasAccountHandler={setSignIn} />;
            break;
        default:
            throw new Error("Undefined screen in signinup");
    }
    return <>{screenToShow}</>;
};
