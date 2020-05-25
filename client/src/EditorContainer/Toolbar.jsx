import React from "react";
import { Row, Col } from "react-grid-system";
import { Icon } from "semantic-ui-react";

//again, it might seem like an overkill to have seperate files for these samll ui pieces
//but I expect these to get complex over time so.

const Toolbar = (props) => (
    <Row align="center">
        <Col xs={1}>
            <Icon name="file text outline" />
        </Col>
        <Col>
            <h4>{props.name}</h4>
        </Col>
    </Row>
);

export default Toolbar;
