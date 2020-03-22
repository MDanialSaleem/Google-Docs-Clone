import React from "react";
import PropTypes from "prop-types";
import {Container, Row, Col} from "react-grid-system";
import MoreVerticalIcon from "@material-ui/icons/MoreVert";
import DocumentIcon from "@material-ui/icons/Description";
import PeopleIcon from "@material-ui/icons/People";

const DocumentItem = props => {
    return (
        <Container fluid>
            <Row>
                <Col sm={1}><DocumentIcon /></Col>
                <Col sm={5}>
                    <Row justify="start">
                        <Col xs="content">
                            Web Proposal
                        </Col>
                        <Col xs={1}>
                            <PeopleIcon />
                        </Col>
                    </Row>
                </Col>
                <Col sm={2}>Me</Col>
                <Col sm={2}>4:48 PM</Col>
                <Col sm={2}><MoreVerticalIcon /></Col>
            </Row>
        </Container>
    );
};


export default DocumentItem;