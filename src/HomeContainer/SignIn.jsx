import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Hidden } from "react-grid-system";
import { Button, Input, Segment, Form, Modal } from "semantic-ui-react";
import {useHistory} from "react-router-dom";
import { Documents } from "../Utils/RoutingConstants"
import Image from "../Assets/Images/Templates/Form.jpg"
import backgroundImage from "../Assets/Images/Templates/Kaghaz.png"

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

const ModalPassword = () => (
    <Modal trigger={<Button color="black" id="fonts" style={{ marginBottom: 5 }}>Forgot your password?</Button>}>
        <Modal.Header>Reset your Password</Modal.Header>
        <Modal.Content>
            <Modal.Description>
                <Input type="email" style={{ marginBottom: 5 }} placeholder="Email" id="fonts"/>
                <p>An email to reset your password will be sent to you.</p>
                <p>It might take 3-5 minutes for you to recieve the email.</p>
            </Modal.Description>
        </Modal.Content>
    </Modal>
)

const SignIn =  props => {
    const history = useHistory();
    const onClickHandler = () => history.push(Documents);

    return (
        <Container style={{marginTop: 60,}} fluid>
            <Row justify="center" debug>
                <Col xs="content" sm={4} md={3} style={{background: "#F8F8F8", borderTopLeftRadius: 10, borderBottomLeftRadius: 10}}>
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
                        <Button color="black" id="fonts" style={{ marginBottom: 5 }} onClick={onClickHandler}>Sign In</Button>
                        <Hidden sm md lg xl><Button basic color="black" id="fonts" style={{ marginBottom: 10 }} onClick={props.noAccountHandler}>or, Sign Up</Button></Hidden>
                        <ModalPassword></ModalPassword>
                    </Form>
                </Col>
                <Hidden xs>
                    <Col xs={3} sm={4} md={3} style={signUpStyle}>
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
    forgotPasswordHandler: PropTypes.func.isRequired,
};

export default SignIn;