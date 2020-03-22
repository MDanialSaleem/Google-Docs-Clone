import React from "react";
import PropTypes from "prop-types";

const SignIn =  props => {
    return (
        <div>
        <form action="#">
            <h1>Sign in</h1>
            <div class="social-container">
                <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
                <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
                <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
            </div>
            <span>or use your account</span>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button onClick={props.forgotPasswordHandler}>Forgot your password?</button>
            <button>Sign In</button>
        </form>
            <div>
                <h1>Hello, Friend!</h1>
                <p>Enter your personal details and start journey with us</p>
                <button onClick={props.noAccountHandler}>Sign Up</button>
            </div>
        </div>
    );
}



SignIn.propTypes = {
    noAccountHandler: PropTypes.func.isRequired,
    forgotPasswordHandler: PropTypes.func.isRequired
};

export default SignIn;