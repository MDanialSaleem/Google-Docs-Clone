import React from "react";
import NewDocCard from "./NewDocCard";
import BlankImg from "../Assets/Images/Templates/Blank.png";
import { Row, Col, Hidden, Visible } from "react-grid-system";
import LetterImg from "../Assets/Images/Templates/Letter.png";
import { Button } from "semantic-ui-react";
import * as Paths from "../Utils/RoutingConstants";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loadUser } from "../Store/Actions/Auth";

const styles = {
    background: "lightgrey",
    padding: "20px 0px",
};

const NewDocCardRow = () => {
    const dispatch = useDispatch();

    const onClickHandler = async () => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const body = JSON.stringify({
            name: "Untitled",
        });

        try {
            await axios.post("/api/documents/", body, config);
            dispatch(loadUser());
        } catch (err) {
            alert("error");
            console.log(JSON.stringify(err));
        }
    };
    return (
        <div style={styles}>
            <Hidden sm xs>
                <Row style={{ paddingBottom: "5px" }} justify="center">
                    <Col xs={3}>
                        <h3>Create A New Document</h3>
                    </Col>
                </Row>

                <Row justify="center">
                    <Col xs="content" onClick={onClickHandler}>
                        <NewDocCard title="Blank" imageUrl={BlankImg} />
                    </Col>
                    <Col xs="content">
                        <NewDocCard title="Letter" imageUrl={LetterImg} />
                    </Col>
                </Row>
            </Hidden>

            <Visible sm xs>
                <Row style={{ paddingBottom: "5px" }} justify="center">
                    <Button color="black" onClick={onClickHandler}>
                        Create a New Document
                    </Button>
                </Row>
            </Visible>
        </div>
    );
};

export default NewDocCardRow;
