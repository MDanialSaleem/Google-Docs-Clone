/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DocumentItem from "./DocumentItem";
import SmallerScreenDocItem from "./SmallerScreenDocItem";
import { Row, Col, Hidden, Visible } from "react-grid-system";
import { useHistory } from "react-router-dom";
import { Editor } from "../Utils/RoutingConstants";
import { loadDocuments } from "../Store/Actions/Document";
import Pagination from "./Pagination";

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
    const documents = useSelector((state) => state.document.documents);
    const dispatch = useDispatch();
    const history = useHistory();
    useEffect(() => {
        dispatch(loadDocuments(1));
    }, []);

    const onClickHandler = (id) => history.push(Editor + "/" + id);

    return (
        <div css={{ marginTop: "10px" }}>
            <Row justify="center">
                <Pagination />
            </Row>
            <Hidden sm xs>
                <Row justify="center">
                    <Col xs={12}>
                        {documents.map((val) => (
                            <div
                                onClick={() => onClickHandler(val._id)}
                                key={val._id}
                            >
                                <DocumentItem
                                    type="doc"
                                    name={val.name}
                                    owner={val.owner.email}
                                    isShared={
                                        val.collaborators.length > 0
                                            ? true
                                            : false
                                    }
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
                    {documents.map((val) => (
                        <Col
                            xs={12}
                            sm={6}
                            onClick={() => onClickHandler(val._id)}
                            key={val._id}
                        >
                            <SmallerScreenDocItem
                                type="doc"
                                name={val.name}
                                owner={val.owner.email}
                                isShared={
                                    val.collaborators.length > 0 ? true : false
                                }
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
