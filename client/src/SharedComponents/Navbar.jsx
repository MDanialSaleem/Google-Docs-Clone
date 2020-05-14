import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as Paths from "../Utils/RoutingConstants";
import { LOGOUT } from "../Store/Actions/Types";

const navBarStyle = {
    backgroundColor: "black",
    overflow: "auto",
    textAlign: "center",
    padding: 20,
};
const linkStyle = {
    float: "left",
    display: "inline-block",
    textDecoration: "none",
    paddingRight: 20,
    color: "white",
};

export default () => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const dispath = useDispatch();
    return (
        <div style={navBarStyle}>
            <Link style={linkStyle}>
                <b>KAGHAZ</b>
            </Link>
            {isAuthenticated ? (
                <>
                    <Link
                        style={{ ...linkStyle, float: "right" }}
                        to={Paths.Home}
                        onClick={() => {
                            delete localStorage.token;
                            dispath({ type: LOGOUT });
                        }}
                    >
                        Logout
                    </Link>
                    <Link
                        style={{ ...linkStyle, float: "right" }}
                        to={Paths.Documents}
                    >
                        Documents
                    </Link>
                </>
            ) : null}
        </div>
    );
};
