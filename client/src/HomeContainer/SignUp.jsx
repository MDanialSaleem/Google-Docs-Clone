import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Hidden } from "react-grid-system";
import { Button, Input, Segment, Form } from "semantic-ui-react";
import Image from "../Assets/Images/Templates/Form.jpg";
import { useForm } from "react-hook-form";

const formStyle = {
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
    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };
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
                    }}
                >
                    <Form style={formStyle} onSubmit={handleSubmit(onSubmit)}>
                        <h1 id="fonts">Create Account</h1>
                        <span id="fonts">Use your social media</span>

                        <span style={{ marginBottom: 10 }} id="fonts">
                            or use your email for registration
                        </span>
                        <Socials />
                        <Form.Field style={{ marginBottom: 5 }}>
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                ref={register}
                                required
                            />
                        </Form.Field>
                        <Form.Field style={{ marginBottom: 5 }}>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                ref={register}
                            />
                        </Form.Field>
                        <Form.Field style={{ marginBottom: 5 }}>
                            <input
                                type="password"
                                name="password"
                                ref={register}
                                placeholder="Password"
                            />
                        </Form.Field>
                        <Form.Field style={{ marginBottom: 5 }}>
                            <input
                                type="password"
                                name="confirmpassword"
                                ref={register}
                                placeholder="Confrim Password"
                            />
                        </Form.Field>
                        <Button
                            color="black"
                            id="fonts"
                            style={{ marginBottom: 5 }}
                            type="submit"
                        >
                            Sign Up
                        </Button>
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
                    </Form>
                </Col>
                <Hidden xs>
                    <Col xs={3} sm={4} md={3} style={signUpStyle}>
                        <Segment basic style={formStyle}>
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
