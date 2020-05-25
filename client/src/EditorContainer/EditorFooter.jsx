/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Row, Col } from "react-grid-system";
import { Item, Button, Popup, Form } from "semantic-ui-react";

const EditorFooter = (props) => {
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
                {props.active ? (
                    <h4>Action: {props.active} editing</h4>
                ) : (
                    <h4>Idle</h4>
                )}
            </Col>
            <Col style={{ display: "flex", justifyContent: "flex-end" }} sm={8}>
                <Popup trigger={<Button>Active Users</Button>}>
                    <Popup.Content>
                        <Item.Group>
                            {props.users
                                ? props.users.map((val) => (
                                      <Item.Header>{val}</Item.Header>
                                  ))
                                : null}
                        </Item.Group>
                    </Popup.Content>
                </Popup>
            </Col>
        </Row>
    );
};

export default EditorFooter;
