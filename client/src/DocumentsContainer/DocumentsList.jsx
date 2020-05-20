import React, { useEffect, useState } from "react";
import axios from "axios";
import DocumentItem from "./DocumentItem";
import SmallerScreenDocItem from "./SmallerScreenDocItem";
import { Row, Col, Hidden, Visible } from "react-grid-system";
import Image from "../Assets/Images/Templates/Doc.png";
import { Container } from "semantic-ui-react";

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
    const [documents, setDocuments] = useState([]);
    const [name, setName] = useState([]); //temp fix for name of doc owner.
    // when shared docs are incorporated we will present a better fix.
    useEffect(() => {
        // because direct async functions are not supported in hooks. for details see
        // https://github.com/facebook/react/issues/14326

        const fetchDocs = async () => {
            try {
                let res = await axios.get("/api/users/");

                // TODO: fix this hack. reversing these makes infinte rendering due to shallow comapare.
                setDocuments(res.data.owndocs);
                setName(res.data.name);
            } catch (err) {
                console.log(err);
            }
        };

        fetchDocs();
    }, [name]);
    return (
        <div>
            <Row justify="center">
                <Hidden sm xs>
                    <Col xs={8}>
                        {documents.map((val) => (
                            <DocumentItem
                                type="doc"
                                name={val.name}
                                owner={name}
                                isShared={false}
                                timeAccessed={formatLastModified(
                                    val.lastModified
                                )}
                            />
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
