/** @jsx jsx */
import { jsx } from "@emotion/core";
import React from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { Button, Form, Modal } from "semantic-ui-react";

const RenameModal = (props) => {
    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        const { name } = data;
        props.onSubmit(name);
        props.onClose();
    };

    return (
        <React.Fragment>
            <Modal
                open={props.open}
                size="mini"
                closeIcon
                onClose={props.onClose}
            >
                <Modal.Header>Rename Document</Modal.Header>
                <Modal.Actions>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Field>
                            <input
                                type="text"
                                name="name"
                                placeholder="New Name"
                                ref={register}
                                autoComplete="off"
                                autoFocus
                            />
                        </Form.Field>
                        <Button type="submit" positive icon="checkmark" />
                    </Form>
                </Modal.Actions>
            </Modal>
        </React.Fragment>
    );
};

RenameModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
};
export default RenameModal;
