import React from "react";
import NewDocCard from "./NewDocCard";
import BlankImg from "../Assets/Images/Templates/Blank.png";
import { Row, Col, Hidden, Visible } from "react-grid-system";
import LetterImg from "../Assets/Images/Templates/Letter.png";
import { Dropdown } from "semantic-ui-react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loadDocuments } from "../Store/Actions/Document";
import { DOCUMENT_TEMPLATES } from "../commonConstants";

const styles = {
    background: "lightgrey",
    padding: "20px 0px",
};

const NewDocCardRow = () => {
    const dispatch = useDispatch();

    const createDocument = async (template) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const body = JSON.stringify({
            name: "Untitled",
            template,
        });

        try {
            await axios.post("/api/documents/", body, config);
            dispatch(loadDocuments());
        } catch (err) {
            console.log(JSON.stringify(err));
        }
    };

    const onBlankHandler = createDocument.bind(null, DOCUMENT_TEMPLATES.BLANK);
    const onLetterHandler = createDocument.bind(
        null,
        DOCUMENT_TEMPLATES.LETTER
    );
    return (
        <div style={styles}>
            <Hidden sm xs>
                <Row style={{ paddingBottom: "5px" }} justify="center">
                    <Col xs={3}>
                        <h3>Create A New Document</h3>
                    </Col>
                </Row>

                <Row justify="center">
                    <Col xs="content" onClick={onBlankHandler}>
                        <NewDocCard title="Blank" imageUrl={BlankImg} />
                    </Col>
                    <Col xs="content" onClick={onLetterHandler}>
                        <NewDocCard title="Letter" imageUrl={LetterImg} />
                    </Col>
                </Row>
            </Hidden>

            <Visible sm xs>
                <Row style={{ paddingBottom: "5px" }} justify="center">
                    <Dropdown text="Create A New Document" color="black">
                        <Dropdown.Menu>
                            <Dropdown.Item
                                text="Blank"
                                onClick={onBlankHandler}
                            />
                            <Dropdown.Item
                                text="Letter"
                                onClick={onLetterHandler}
                            />
                        </Dropdown.Menu>
                    </Dropdown>
                </Row>
            </Visible>
        </div>
    );
};

export default NewDocCardRow;
