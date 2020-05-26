/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { Button, Form, Modal, Label, Segment } from "semantic-ui-react";

const ShareModal = (props) => {
    const { register, handleSubmit } = useForm();
    const [collaborators, setCollaborators] = useState([]);

    const getCollaborators = async () => {
        try {
            const res = await axios.get("/api/documents/share/" + props.id);
            setCollaborators(res.data.collaborators.map((user) => user.email));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getCollaborators();
    }, []);

    const onSubmit = async (data) => {
        const { collaborator } = data;
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const body = JSON.stringify({ collaborator, share: true });
        try {
            await axios.put(`/api/documents/share/${props.id}`, body, config);
            getCollaborators();
        } catch (error) {
            console.log("server error");
        }
    };

    const onDelete = async (collaborator) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const body = JSON.stringify({ collaborator, share: false });
        try {
            await axios.put(`/api/documents/share/${props.id}`, body, config);
            getCollaborators();
        } catch (error) {
            console.log("server error");
        }
    };

    return (
        <Modal open={props.open} size="tiny" closeIcon onClose={props.onClose}>
            <Modal.Header>Change Who Has Access</Modal.Header>
            <Modal.Actions>
                <Segment.Group>
                    {collaborators.map((user) => (
                        <Segment textAlign="left">
                            {user}
                            <Button
                                basic
                                circular
                                attached="right"
                                icon="close"
                                onClick={() => onDelete(user)}
                            />
                        </Segment>
                    ))}
                </Segment.Group>
            </Modal.Actions>
            <Modal.Actions>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Field>
                        <input
                            type="email"
                            name="collaborator"
                            placeholder="Email"
                            ref={register}
                            autoComplete="off"
                            autoFocus
                        />
                    </Form.Field>
                    <Button type="submit" positive icon="arrow circle right" />
                </Form>
            </Modal.Actions>
        </Modal>
    );
};

ShareModal.propTypes = {
    id: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default ShareModal;
