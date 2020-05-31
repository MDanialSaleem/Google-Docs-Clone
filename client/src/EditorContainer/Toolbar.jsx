/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useState } from "react";
import { Row, Col } from "react-grid-system";
import { Icon, Button } from "semantic-ui-react";
import RenameModal from "../SharedComponents/RenameModal";
import PropTypes from "prop-types";

//again, it might seem like an overkill to have seperate files for these samll ui pieces
//but I expect these to get complex over time so.

const Toolbar = (props) => {
    const [modalOpen, setModalOpen] = useState(false);
    const onOpen = () => setModalOpen(true);
    const onClose = () => setModalOpen(false);
    return (
        <Row align="center">
            <Col xs={1}>
                <Icon name="file text outline" />
            </Col>
            <Col css={{ padding: "5px 0px" }}>
                <h4 css={{ display: "inline", marginRight: "20px" }}>
                    {props.name}
                </h4>
                <Button
                    onClick={onOpen}
                    icon="pencil"
                    color="red"
                    size="tiny"
                />
                <RenameModal
                    open={modalOpen}
                    onClose={onClose}
                    onSubmit={props.onSubmit}
                />
            </Col>
        </Row>
    );
};

Toolbar.propTypes = {
    name: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

export default Toolbar;
