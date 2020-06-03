import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Modal, Form, Button, Message } from "semantic-ui-react";
import { successAlert } from "../Store/Actions/Alert";
import { useDispatch } from "react-redux";
//isolating becaause of react-form-hook
const SecondForm = (props) => {
    const { register, handleSubmit } = useForm();
    const [serverErr, setServerErr] = useState([]);
    const dispatch = useDispatch();
    const secondOnSubmit = (data) => {
        const submit = async (token, password) => {
            try {
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                    },
                };
                const body = JSON.stringify({ token, password });
                await axios.post("/api/users/resetpassword/", body, config);
                dispatch(successAlert("Password reset successful"));
            } catch (error) {
                setServerErr(error.response.data.errors);
            }
        };
        submit(data.token, data.password);
    };

    const styles = {
        margin: "5px",
    };

    return (
        <Form
            onSubmit={handleSubmit(secondOnSubmit)}
            error={serverErr && serverErr.length > 0 ? true : false}
        >
            {serverErr.map((value) => (
                <Message error content={value.message} />
            ))}
            <Form.Field style={styles}>
                <input
                    type="text"
                    name="token"
                    placeholder="Token"
                    ref={register}
                    required
                />
            </Form.Field>
            <Form.Field style={styles}>
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    ref={register}
                    required
                />
            </Form.Field>
            <Button color="black" style={styles} type="submit">
                Submit
            </Button>
        </Form>
    );
};
export default () => {
    const [initialDone, setInitialDone] = useState(false);
    const { register, handleSubmit } = useForm();

    const onInitialSubmit = (data) => {
        const getResetToken = async (email) => {
            try {
                await axios.get(`/api/users/resetpasswordtoken/${email}`);
                setInitialDone(true);
            } catch (error) {
                console.log(error);
            }
        };
        getResetToken(data.email);
    };

    const styles = {
        margin: "5px",
    };
    return (
        <Modal
            trigger={
                <Button color="black" style={{ marginBottom: 5 }}>
                    Forgot your password?
                </Button>
            }
            onClose={() => setInitialDone(false)}
            closeIcon
        >
            <Modal.Header>Reset your Password</Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    {!initialDone ? (
                        <>
                            <Form onSubmit={handleSubmit(onInitialSubmit)}>
                                <Form.Field style={styles}>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        ref={register}
                                        required
                                    />
                                </Form.Field>
                                <Button
                                    color="black"
                                    style={styles}
                                    type="submit"
                                >
                                    Get Token
                                </Button>
                            </Form>

                            <p>
                                An email to reset your password will be sent to
                                you.
                            </p>
                            <p>
                                It might take 3-5 minutes for you to recieve the
                                email.
                            </p>
                        </>
                    ) : (
                        <SecondForm />
                    )}
                </Modal.Description>
            </Modal.Content>
        </Modal>
    );
};
