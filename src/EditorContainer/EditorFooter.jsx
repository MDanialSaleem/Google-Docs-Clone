/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Row, Col } from "react-grid-system";
import { Item, Button, Popup } from "semantic-ui-react";

const EditorFooter = () => {
    const footerStyles = {
        position: "sticky",
        bottom: 0,
        left: 0,
        zIndex: 1,
        backgroundColor: "grey",
        width: "100%",
        padding: "10px",
    };

    return (
        <Row
            style={footerStyles}
            align="center"
            justify="between"
            gutterWidth={0}
        >
            <Col sm={4}>
                <h4>Action: User 1 editing</h4>
            </Col>
            <Col style={{ display: "flex", justifyContent: "flex-end" }} sm={8}>
                <Popup trigger={<Button>Active Users</Button>}>
                    <Popup.Content>
                        <Item.Group>
                            <Item.Header>User 1</Item.Header>
                            <Item.Header>User 2</Item.Header>
                        </Item.Group>
                    </Popup.Content>
                </Popup>
            </Col>
        </Row>
    );
};

export default EditorFooter;
