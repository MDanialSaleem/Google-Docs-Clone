/** @jsx jsx */
import { jsx } from "@emotion/core";
import React from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import PropTypes from "prop-types";
import { Row, Col } from "react-grid-system";
import { Icon } from "semantic-ui-react";
import { Dropdown } from "semantic-ui-react";
import RenameModal from "../SharedComponents/RenameModal";
import { loadUser } from "../Store/Actions/Auth";

const DropdownSettings = (props) => {
    const onSubmit = async (name) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const body = JSON.stringify({ name });
        try {
            const res = await axios.put(
                `/api/documents/${props.id}`,
                body,
                config
            );
        } catch (error) {
            console.log("server error");
        }
    };
    const [modalOpen, setModalOpen] = React.useState(false);
    const dispatch = useDispatch();
    return (
        <div>
            <Dropdown icon="ellipsis vertical">
                <Dropdown.Menu>
                    <Dropdown.Item
                        text="Delete"
                        onClick={() => props.onDeleteHandler(props.id)}
                    />
                    <Dropdown.Item
                        text="Rename"
                        onClick={() => setModalOpen(true)}
                    />
                    <RenameModal
                        open={modalOpen}
                        onClose={() => {
                            setModalOpen(false);
                            dispatch(loadUser());
                        }}
                        onSubmit={onSubmit}
                    />
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
};

const DocumentItem = (props) => {
    const dispath = useDispatch();
    const deleteDoc = async (id) => {
        try {
            await axios.delete("/api/documents/" + id);
            dispath(loadUser());
        } catch (err) {
            console.log(err.response);
        }
    };

    const styles = {
        margin: "10px 0px",
        padding: "5px 0px",
        ":hover": {
            backgroundColor: "lightblue",
            cursor: "pointer",
        },
    };
    return (
        <div css={styles}>
            <Row>
                {/* deprecating the types of documents for now. */}
                <Col sm={1}>
                    {props.type === "doc" ? (
                        <Icon name="file word" />
                    ) : (
                        <Icon name="file word" />
                    )}
                </Col>
                <Col sm={5}>
                    <Row justify="start">
                        <Col xs="content">{props.name}</Col>
                        <Col xs={1}>
                            {props.isShared ? <Icon name="users" /> : null}
                        </Col>
                    </Row>
                </Col>
                <Col sm={2}>{props.owner}</Col>
                <Col sm={2}>{props.timeAccessed}</Col>
                <Col sm={2}>
                    <DropdownSettings
                        onDeleteHandler={deleteDoc}
                        id={props.id}
                    ></DropdownSettings>
                </Col>
            </Row>
        </div>
    );
};

DocumentItem.propTypes = {
    type: PropTypes.oneOf(["doc", "txt"]).isRequired,
    name: PropTypes.string.isRequired,
    isShared: PropTypes.bool.isRequired,
    owner: PropTypes.string.isRequired,
    timeAccessed: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
};

DocumentItem.defaultProps = {
    type: "doc",
};

export default DocumentItem;
