import React, { useState } from "react";
import { Button, Form, Message } from "semantic-ui-react";
import { useForm } from "react-hook-form";
import axios from "axios";

export default () => {
    const { register, handleSubmit, errors, watch } = useForm();

    const [serverErr, setServerErr] = useState([]);
    const onSubmit = (data) => {
        const register = async (name, email, password) => {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            const body = JSON.stringify({ name, email, password });

            try {
                const res = await axios.post("/api/users", body, config);
                console.log(res);
            } catch (err) {
                setServerErr(err.response.data.errors);
            }
        };
        const { name, email, password } = data;
        register(name, email, password);
    };
    return (
        <Form
            onSubmit={handleSubmit(onSubmit)}
            error={
                errors.confirmPassword || (serverErr && serverErr.length > 0)
                    ? true
                    : false
            }
        >
            {errors.confirmPassword ? (
                <Message error content="Passwords must match" />
            ) : null}
            {serverErr.map((value) => (
                <Message error content={value.message} />
            ))}
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
                    minLength={6}
                />
            </Form.Field>
            <Form.Field style={{ marginBottom: 5 }}>
                <input
                    type="password"
                    name="confirmPassword"
                    ref={register({
                        validate: (value) => value === watch("password"),
                    })}
                    placeholder="Confrim Password"
                    required
                />
            </Form.Field>
            <Button
                color="black"
                 
                style={{ marginBottom: 5 }}
                type="submit"
            >
                Sign Up
            </Button>
        </Form>
    );
};
