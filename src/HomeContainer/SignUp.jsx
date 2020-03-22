import React from "react";
import PropTypes from "prop-types";

const SignUp = props =>
<>
    <div>
		<form action="#">
			<h1>Create Account</h1>
			<div class="social-container">
				<a><i class="fab fa-facebook-f"></i></a>
				<a><i class="fab fa-google-plus-g"></i></a>
				<a><i class="fab fa-linkedin-in"></i></a>
			</div>
			<span>or use your email for registration</span>
			<input type="text" placeholder="Name" />
			<input type="email" placeholder="Email" />
			<input type="password" placeholder="Password" />
			<button>Sign Up</button>
		</form>
	</div>
	<div>
				<h1>Welcome Back!</h1>
				<p>To keep connected with us please login with your personal info</p>
				<button onClick={props.hasAccountHandler}>Sign In</button>
	</div>
</>

SignUp.propTypes = {
	hasAccountHandler: PropTypes.func.isRequired
};


export default SignUp;