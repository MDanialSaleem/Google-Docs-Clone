/** @jsx jsx */
import { jsx } from "@emotion/core";
import PropTypes from "prop-types";
import { Row, Col } from "react-grid-system";
import { Icon } from "semantic-ui-react";
import SettingsDropdown from "./SettingsDropdown";

const DocumentItem = (props) => {
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
                    <Icon name="file word" />
                </Col>
                <Col sm={4}>
                    <Row justify="start">
                        <Col xs="content">{props.name}</Col>
                        <Col xs={1}>
                            {props.isShared ? <Icon name="users" /> : null}
                        </Col>
                    </Row>
                </Col>
                <Col sm={3} css={{ overflow: "hidden" }}>
                    {props.owner}
                </Col>
                <Col sm={2}>{props.timeAccessed}</Col>
                <Col sm={2}>
                    <SettingsDropdown
                        owner={props.owner}
                        id={props.id}
                    ></SettingsDropdown>
                </Col>
            </Row>
        </div>
    );
};

DocumentItem.propTypes = {
    name: PropTypes.string.isRequired,
    isShared: PropTypes.bool.isRequired,
    owner: PropTypes.string.isRequired,
    timeAccessed: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
};

export default DocumentItem;
