import React from "react";
import { useSelector } from "react-redux";
import { Home } from "../Utils/RoutingConstants";
import { Redirect } from "react-router";

export default (props) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    return isAuthenticated ? <>{props.children}</> : <Redirect to={Home} />;
};
