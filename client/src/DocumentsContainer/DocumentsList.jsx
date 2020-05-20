import React, { useState } from "react";
import { useSelector } from "react-redux";
import DocumentItem from "./DocumentItem";
import SmallerScreenDocItem from "./SmallerScreenDocItem";
import { Row, Col, Hidden, Visible } from "react-grid-system";
import { Container } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { Editor } from "../Utils/RoutingConstants";

// TODO-MAYBE: Might want to encapsualte the two different visualizations of indivuals documents into another file
// and do the visibilty check (based on screen size) there.
const formatLastModified = (datastr) => {
    const date = new Date(datastr);
    const now = new Date();

    if (
        date.getDate() === now.getDate() &&
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear()
    ) {
        const sep = ":";
        return date.getHours() + sep + date.getMinutes();
    } else {
        const sep = "-";

        return (
            date.getDate() + sep + date.getMonth() + sep + date.getFullYear()
        );
    }
};

const DocumentList = () => {
    const documents = useSelector((state) => state.auth.user.owndocs);
    const history = useHistory();
    const onClickHandler = (id) => history.push(Editor + "/" + id);
    const name = useSelector((state) => state.auth.user.name);

    return (
        <div>
            <Row justify="center">
                <Hidden sm xs>
                    <Col xs={8}>
                        {documents.map((val) => (
                            <div onClick={() => onClickHandler(val._id)}>
                                <DocumentItem
                                    key={val.name}
                                    type="doc"
                                    name={val.name}
                                    owner={name}
                                    isShared={false}
                                    timeAccessed={formatLastModified(
                                        val.lastModified
                                    )}
                                    id={val._id}
                                />
                            </div>
                        ))}
                    </Col>
                </Hidden>
            </Row>

            <Visible sm xs>
                <Container fluid>
                    <Row align="start" debug xs={12} sm={4}>
                        {documents.map((val) => (
                            <Col style={{ padding: "5px 5px" }}>
                                <SmallerScreenDocItem
                                    type="doc"
                                    name={val.name}
                                    owner={name}
                                    isShared={false}
                                    timeAccessed={formatLastModified(
                                        val.lastModified
                                    )}
                                />
                            </Col>
                        ))}
                    </Row>
                </Container>
            </Visible>
        </div>
    );
};

export default DocumentList;
