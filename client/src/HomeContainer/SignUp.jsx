import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Hidden } from "react-grid-system";
import { Button, Segment } from "semantic-ui-react";
import Image from "../Assets/Images/Templates/Form.jpg";
import SignUpForm from "./SignUpForm";

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

const Socials = () => (
    <Segment basic class="social-container">
        <Button
            circular
            color="facebook"
            href="#"
            class="social"
            icon="facebook"
        />
        <Button
            circular
            color="google plus"
            href="#"
            class="social"
            icon="google plus"
        />
        <Button
            circular
            color="linkedin"
            href="#"
            class="social"
            icon="linkedin"
        />
    </Segment>
);

const SignUp = (props) => {
    return (
        <Container
            style={{
                marginTop: 60,
                backgroundImage: "url('./Assets/Images/Templates/Kaghaz.png')",
            }}
            fluid
        >
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
                    <h1>Create Account</h1>
                    <span>Use your social media</span>

                    <span style={{ marginBottom: 10 }}>
                        or use your email for registration
                    </span>
                    <Socials />
                    <SignUpForm />
                    <Hidden sm md lg xl>
                        <Button
                            basic
                            color="black"
                            id="fonts"
                            style={{ marginBottom: 10 }}
                            onClick={props.hasAccountHandler}
                        >
                            or, Sign In
                        </Button>
                    </Hidden>
                </Col>
                <Hidden xs>
                    <Col xs={3} sm={4} md={3} style={signUpStyle}>
                        <Segment basic style={colStyle}>
                            <h1 id="fonts" style={{ paddingTop: 70 }}>
                                Welcome Back!
                            </h1>
                            <p id="fonts">
                                To keep connected with us please login with your
                                personal info
                            </p>
                            <Button
                                color="black"
                                id="fonts"
                                style={{ marginTop: 10 }}
                                onClick={props.hasAccountHandler}
                            >
                                Sign In
                            </Button>
                        </Segment>
                    </Col>
                </Hidden>
            </Row>
        </Container>
    );
};

SignUp.propTypes = {
    hasAccountHandler: PropTypes.func.isRequired,
};

export default SignUp;
