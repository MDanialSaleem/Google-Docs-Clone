import React from "react";
import { useSelector } from "react-redux";
import DocumentItem from "./DocumentItem";
import SmallerScreenDocItem from "./SmallerScreenDocItem";
import { Row, Col, Hidden, Visible } from "react-grid-system";
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
    const shareddocuments = useSelector((state) => state.auth.user.colabdocs);
    const history = useHistory();
    const onClickHandler = (id) => history.push(Editor + "/" + id);

    // THE LISTING IS A TEMP FIX.
    return (
        <div>
            <Hidden sm xs>
                <Row justify="center">
                    <Col xs={8}>
                        {documents.concat(shareddocuments).map((val) => (
                            <div onClick={() => onClickHandler(val._id)}>
                                <DocumentItem
                                    key={val.name}
                                    type="doc"
                                    name={val.name}
                                    owner={val.owner.email}
                                    isShared={val.collaborators ? true : false}
                                    timeAccessed={formatLastModified(
                                        val.lastModified
                                    )}
                                    id={val._id}
                                />
                            </div>
                        ))}
                    </Col>
                </Row>
            </Hidden>
            <Visible sm xs>
                <Row>
                    {documents.concat(shareddocuments).map((val) => (
                        <Col xs={4} onClick={() => onClickHandler(val._id)}>
                            <SmallerScreenDocItem
                                key={val.name}
                                type="doc"
                                name={val.name}
                                owner={val.owner.email}
                                isShared={val.collaborators ? true : false}
                                timeAccessed={formatLastModified(
                                    val.lastModified
                                )}
                                id={val._id}
                            />
                        </Col>
                    ))}
                </Row>
            </Visible>
        </div>
    );
};

export default DocumentList;
