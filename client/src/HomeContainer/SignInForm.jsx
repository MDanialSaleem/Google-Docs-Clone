import React, { useState } from "react";
import { Button, Form, Message } from "semantic-ui-react";
import { useForm } from "react-hook-form";
import axios from "axios";

export default () => {
    const { register, handleSubmit } = useForm();

    const [serverErr, setServerErr] = useState([]);
    const onSubmit = (data) => {
        const register = async (email, password) => {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            const body = JSON.stringify({ email, password });

            try {
                const res = await axios.post("/api/users/login", body, config);
                console.log(res);
            } catch (err) {
                setServerErr(err.response.data.errors);
            }
        };
        const { email, password } = data;
        register(email, password);
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
                id="fonts"
                style={{ marginBottom: 5 }}
                type="submit"
            >
                Sign In
            </Button>
        </Form>
    );
};
