import React from "react";
import PropTypes from "prop-types";
import {Row, Col} from "react-grid-system";
import MoreVerticalIcon from "@material-ui/icons/MoreVert";
import DocumentIcon from "@material-ui/icons/Description";
import TextIcon from "@material-ui/icons/TextFormat";
import PeopleIcon from "@material-ui/icons/People";


const DocumentItem = props => {
    const styles = {
        padding : "10px 0px"
    };

    return (
        <div style={styles}>
            <Row>
                <Col sm={1}>{props.type === "doc" ? <DocumentIcon /> : <TextIcon />}</Col>
                <Col sm={5}>
                    <Row justify="start">
                        <Col xs="content">
                            {props.name}
                        </Col>
                        <Col xs={1}>
                            {props.isShared ? <PeopleIcon /> : null } 
                        </Col>
                    </Row>
                </Col>
                <Col sm={2}>{props.owner}</Col>
                <Col sm={2}>{props.timeAccessed}</Col>
                <Col sm={2}><MoreVerticalIcon /></Col>
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