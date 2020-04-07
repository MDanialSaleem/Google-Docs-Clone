import React from "react";
import { Row, Col } from "react-grid-system";
import SubToolbar1 from "./SubToolbar1";
import { Icon } from "semantic-ui-react";

//again, it might seem like an overkill to have seperate files for these samll ui pieces
//but I expect these to get complex over time so.

const Toolbar = () => (
    <>
        <Row align="center">
            <Col xs={1}>
                <Icon name="file text outline" />
            </Col>
            <Col>
                <h2>Name</h2>
            </Col>
        </Row>
        <SubToolbar1 />
    </>
);

export default Toolbar;
