import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Hidden } from "react-grid-system";
import { Button, Input, Segment, Form } from "semantic-ui-react";
import Image from "../Assets/Images/Templates/Form.jpg"

const formStyle = {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    textAlign: 'center',
    paddingTop: 70,
};

const signUpStyle = {
    height: 500,
    backgroundImage: `url(${Image})`,
    color: "white",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
};

const SignIn =  props => {
    return (
        <Container style={{maxWidth: "50%", marginTop: 60}}>
            <Row debug>
                <Col style={{background: "#F8F8F8", borderTopLeftRadius: 10, borderBottomLeftRadius: 10}}>
                    <Form action="#" style={formStyle}>
                        <h1 id="fonts">Sign In</h1>
                        <span id="fonts"> with your social media account</span>
                        <Segment basic class="social-container">
                            <Button circular color='facebook' href="#" class="social" icon="facebook"/>
                            <Button circular color='google plus'href="#" class="social" icon="google plus"/>
                            <Button circular color='linkedin' href="#" class="social" icon="linkedin"/>
                        </Segment>
                        <span id="fonts" style={{ marginBottom: 5 }}>or use your Kaghaz account</span>
                        <Input type="email" style={{ marginBottom: 5 }} placeholder="Email" id="fonts"/>
                        <Input type="password" style={{ marginBottom: 10 }} placeholder="Password" id="fonts"/>
                        <Button color="black" id="fonts" style={{ marginBottom: 5 }} onClick={props.forgotPasswordHandler}>Forgot your password?</Button>
                        <Button color="black" id="fonts" style={{ marginBottom: 5 }}>Sign In</Button>
                        <Hidden md lg xl><Button inverted color="black" id="fonts" style={{ marginBottom: 10 }} onClick={props.noAccountHandler}>or, Sign Up</Button></Hidden>
                    </Form>
                </Col>
                <Hidden sm xs>
                    <Col style={signUpStyle}>
                        <Segment basic style={formStyle}>
                            <h1 id="fonts" style={{paddingTop: 70}}>Hello, Friend!</h1>
                            <p id="fonts">Enter your personal details and start your journey with us!</p>
                            <Button color="black" id="fonts" style={{ marginTop: 10 }} onClick={props.noAccountHandler}>Sign Up</Button>
                        </Segment>
                    </Col>
                </Hidden>
            </Row>
        </Container>
    );
}

SignIn.propTypes = {
    noAccountHandler: PropTypes.func.isRequired,
    forgotPasswordHandler: PropTypes.func.isRequired
};

export default SignIn;