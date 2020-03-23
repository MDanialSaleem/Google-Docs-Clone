import React from "react";
import {Row, Col} from "react-grid-system";
import DocumentIcon from "@material-ui/icons/Description";
import SubToolbar1 from "./SubToolbar1";
import SubToolbar2 from "./SubToolbar2";

//again, it might seem like an overkill to have seperate files for these samll ui pieces
//but I expect these to get complex over time so.

const Toolbar = () => (
    <>
        <Row align="center">
            <Col xs={1}><DocumentIcon /></Col>
            <Col><h4>Name</h4></Col>
        </Row>
        <SubToolbar1 />
        <SubToolbar2 />
    </>
);


export default Toolbar;