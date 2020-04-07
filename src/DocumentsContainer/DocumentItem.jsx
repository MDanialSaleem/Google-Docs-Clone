/** @jsx jsx */
import { jsx } from "@emotion/core";
import PropTypes from "prop-types";
import { Row, Col } from "react-grid-system";
import { Icon, Dropdown } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { Editor } from "../Utils/RoutingConstants";

const DropdownSettings = () => (
    <Dropdown icon="ellipsis vertical">
        <Dropdown.Menu>
            <Dropdown.Header content="settings"/>
            <Dropdown.Item text="Delete"/>
            <Dropdown.Item text="Rename"/>
        </Dropdown.Menu>
    </Dropdown>
)

const DocumentItem = props => {
    const styles = {
        margin: "10px 0px",
        padding: "5px 0px",
        ":hover": {
            backgroundColor: "lightblue",
            cursor: "pointer"
        }
    };

    const history = useHistory();
    const onClickHandler = () => history.push(Editor);

    return (
        <div css={styles} onClick={onClickHandler}>
            <Row>
                {/* deprecating the types of documents for now. */}
                <Col sm={1}>{props.type === "doc" ? <Icon name="file word" /> : <Icon name="file word" /> }</Col>
                <Col sm={5}>
                    <Row justify="start">
                        <Col xs="content">
                            {props.name}
                        </Col>
                        <Col xs={1}>
                            {props.isShared ? <Icon name="users" /> : null } 
                        </Col>
                    </Row>
                </Col>
                <Col sm={2}>{props.owner}</Col>
                <Col sm={2}>{props.timeAccessed}</Col>
                <Col sm={2}><DropdownSettings></DropdownSettings></Col>
            </Row>
        </div>
    );
};

DocumentItem.propTypes  = {
    type: PropTypes.oneOf(['doc', 'txt']).isRequired,
    name: PropTypes.string.isRequired,
    isShared: PropTypes.bool.isRequired,
    owner: PropTypes.string.isRequired,
    timeAccessed: PropTypes.string.isRequired,
}

DocumentItem.defaultProps = {
    type: "doc"
}

export default DocumentItem;