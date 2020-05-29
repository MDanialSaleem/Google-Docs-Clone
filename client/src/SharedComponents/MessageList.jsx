import React from "react";
import { Message } from "semantic-ui-react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { removeAlert } from "../Store/Actions/Alert";

const SingleMessage = (props) => {
    const dispatch = useDispatch();

    const MessageProps = {};

    props.type ? (MessageProps.success = true) : (MessageProps.error = true);

    return (
        <Message
            style={{
                margin: "0px",
            }}
            {...MessageProps}
            onDismiss={() => dispatch(removeAlert(props.id))}
            content={props.content}
        />
    );
};

SingleMessage.propTypes = {
    type: PropTypes.bool.isRequired,
    content: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
};

const MessageList = () => {
    const messages = useSelector((state) => state.alert);
    return (
        <div
            style={{
                position: "fixed",
                top: 50,
                left: 0,
                zIndex: 10,
                width: "100%",
            }}
        >
            {messages.map((message) => (
                <SingleMessage
                    type={message.type}
                    content={message.message}
                    id={message.id}
                />
            ))}
        </div>
    );
};

export default MessageList;
