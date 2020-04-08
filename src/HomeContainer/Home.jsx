import React from "react";
import SignInUp from "./SignInUp";
import Image from "../Assets/Images/Templates/Kaghaz.png"

export default () => (
    <div id="login" style={{
        backgroundImage: `url(${Image})`,
        height: "90vh",
        overflow: "hidden",
    }}>
        <SignInUp />
    </div>
);