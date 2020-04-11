import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Hidden } from "react-grid-system";
import { Button, Input, Segment, Form } from "semantic-ui-react"
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

class SignUp extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			inputs: {},
			errors: {},
		}
	}

	validate() {
		let inputs = this.state.inputs;
		let errors = {};
		let validity = true;

		if(!inputs["name"]) {
			validity = false;
			errors["name"] = "Your name cannot be empty.";
		}

		if(!inputs["email"]) {
			validity = false;
			errors["email"] = "The email cannot be empty";
		}

		if(!inputs["password"]) {
			validity = false;
			errors["password"] = "Your password cannot be empty.";
		}
 
		if(typeof inputs["email"] !== "undefined") {
			let atCheck = inputs["email"].lastIndexOf('@');
			let dotCheck = inputs["email"].lastIndexOf('.');
 
			if (!(atCheck < dotCheck && atCheck > 0 && inputs["email"].indexOf('@@') == -1 && dotCheck > 2 && (inputs["email"].length - dotCheck) > 2)) {
			   validity = false;
			   errors["email"] = "Email is not valid";
			}
		}

		this.setState({errors: errors});
		return validity;
	}

	submitForm(e){
        e.preventDefault();

        if(this.validate()) {
           alert("Sign Up successful");
        } else {
           alert("Sign Up not completed; the form has errors.")
        }
	}
	
	handleChange(field, e){         
        let inputs = this.state.inputs;
        inputs[field] = e.target.value;        
        this.setState({inputs});
	}
	
	render() {
		return (
			<Container style={{marginTop: 60, backgroundImage: "url('./Assets/Images/Templates/Kaghaz.png')"}} fluid>
			<Row justify="center" debug>
				<Col xs="content" sm={4} md={3} style={{background: "#F8F8F8", borderTopLeftRadius: 10, borderBottomLeftRadius: 10}}>
					<Form action="#" style={formStyle}>
						<h1 id="fonts">Create Account</h1>
						<span id="fonts">Use your social media</span>
						<Segment basic class="social-container">
							<Button circular color='facebook' href="#" class="social" icon="facebook"/>
							<Button circular color='google plus'href="#" class="social" icon="google plus"/>
							<Button circular color='linkedin' href="#" class="social" icon="linkedin"/>
						</Segment>
						<span style={{ marginBottom: 10 }} id="fonts">or use your email for registration</span>
						<Input type="text" style={{ marginBottom: 5 }} placeholder="Name" id="fonts" onChange={this.handleChange.bind(this, "name")} value={this.state.inputs["name"]}/>
						<Input type="email" style={{ marginBottom: 5 }} placeholder="Email" id="fonts" onChange={this.handleChange.bind(this, "email")} value={this.state.inputs["email"]}/>
						<Input type="password" style={{ marginBottom: 5 }} placeholder="Password" id="fonts" onChange={this.handleChange.bind(this, "password")} value={this.state.inputs["password"]}/>
						<Button color="black" id="fonts" style={{ marginBottom: 5 }} onClick={this.submitForm.bind(this)}>Sign Up</Button>
						<Hidden sm md lg xl><Button basic color="black" id="fonts" style={{ marginBottom: 10 }} onClick={this.props.hasAccountHandler}>or, Sign In</Button></Hidden>
					</Form>
				</Col>
				<Hidden xs>
					<Col xs={3} sm={4} md={3} style={signUpStyle}>
						<Segment basic style={formStyle}>
							<h1 id="fonts" style={{paddingTop: 70}}>Welcome Back!</h1>
							<p id="fonts">To keep connected with us please login with your personal info</p>
							<Button color="black" id="fonts" style={{marginTop: 10}} onClick={this.props.hasAccountHandler}>Sign In</Button>
						</Segment>
					</Col>
				</Hidden>
			</Row>
		</Container>
		)
	}
}

SignUp.propTypes = {
	hasAccountHandler: PropTypes.func.isRequired
};

export default SignUp;