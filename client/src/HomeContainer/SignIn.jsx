import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Hidden } from "react-grid-system";
import { Button, Segment } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { Documents } from "../Utils/RoutingConstants";
import Image from "../Assets/Images/Templates/Form.jpg";
import Socials from "./Socials";
import SignInForm from "./SignInForm";
import ForgotPassword from "./ForgotPassword";

const colStyle = {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    textAlign: "center",
    paddingTop: 70,
};

const signUpStyle = {
    height: 500,
    backgroundImage: `url(${Image})`,
    color: "white",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
};
const SignIn = (props) => {
    const history = useHistory();
    const onClickHandler = () => history.push(Documents);

    return (
        <Container style={{ marginTop: 60 }} fluid>
            <Row justify="center" debug>
                <Col
                    xs="content"
                    sm={4}
                    md={3}
                    style={{
                        background: "#F8F8F8",
                        borderTopLeftRadius: 10,
                        borderBottomLeftRadius: 10,
                        ...colStyle,
                    }}
                >
                    <h1>Sign In</h1>
                    <span> with your social media account</span>
                    <Socials />
                    <span style={{ marginBottom: 5 }}>
                        or use your Kaghaz account
                    </span>
                    <SignInForm />
                    <Hidden sm md lg xl>
                        <Button
                            basic
                            color="black"
                            style={{ marginBottom: 10 }}
                            onClick={props.noAccountHandler}
                        >
                            or, Sign Up
                        </Button>
                    </Hidden>
                    <ForgotPassword />
                </Col>
                <Hidden xs>
                    <Col xs={3} sm={4} md={3} style={signUpStyle}>
                        <Segment basic style={colStyle}>
                            <h1 style={{ paddingTop: 70 }}>Hello, Friend!</h1>
                            <p>
                                Enter your personal details and start your
                                journey with us!
                            </p>
                            <Button
                                color="black"
                                style={{ marginTop: 10 }}
                                onClick={props.noAccountHandler}
                            >
                                Sign Up
                            </Button>
                        </Segment>
                    </Col>
                </Hidden>
            </Row>
        </Container>
    );
};

SignIn.propTypes = {
    noAccountHandler: PropTypes.func.isRequired,
};

export default SignIn;
