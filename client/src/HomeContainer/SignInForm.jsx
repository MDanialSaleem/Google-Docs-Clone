import React, { useState } from "react";
import { Button, Form, Message, Portal } from "semantic-ui-react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { connect } from "react-redux";
import { loadUser } from "../Store/Actions/Auth";
import PropTypes from "prop-types";

const SignInForm = (props) => {
    const { register, handleSubmit } = useForm();

    const [serverErr, setServerErr] = useState([]);
    const onSubmit = (data) => {
        const login = async (email, password) => {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            const body = JSON.stringify({ email, password });

            try {
                const res = await axios.post("/api/users/login", body, config);
                localStorage.token = res.data.token;
                props.loadUser();
            } catch (err) {
                delete localStorage['token'];
                props.loadUser();
                setServerErr(err.response.data.errors);
            }
        };
        const { email, password } = data;
        login(email, password);
    };
    return (
        <Form
            onSubmit={handleSubmit(onSubmit)}
            error={serverErr && serverErr.length > 0 ? true : false}
        >
            {serverErr.map((value) => (
                <Message error content={value.message} />
            ))}
            <Form.Field style={{ marginBottom: 5 }}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    ref={register}
                    required
                />
            </Form.Field>
            <Form.Field style={{ marginBottom: 5 }}>
                <input
                    type="password"
                    name="password"
                    ref={register}
                    placeholder="Password"
                    required
                />
            </Form.Field>
            <Button
                color="black"
                 
                style={{ marginBottom: 5 }}
                type="submit"
            >
                Sign In
            </Button>
        </Form>
    );
};

SignInForm.propTypes = {
    loadUser: PropTypes.func.isRequired,
};

export default connect(null, { loadUser })(SignInForm);
