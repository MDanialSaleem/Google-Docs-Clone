/** @jsx jsx */
import { jsx } from "@emotion/core";
import Toolbar from "./Toolbar";
import DocEditor from "./DocEditor";
import { Row, Col, Hidden } from "react-grid-system";
import EditorState from "./EditorContext/State";
import { Item, Icon, Button, Popup } from "semantic-ui-react";
import AvatarImg from "../Assets/Images/userimage.png";

const Editor = () => {
    const style = {
        marginTop: "50px",
    };

    const footerStyles = {
        position: "fixed",
        bottom: 0,
        left: 0,
        zIndex: 1,
        backgroundColor: "pink",
        width: "100%",
    };

    return (
        <div>
            <Toolbar />
            <Row css={style} justify="center">
                <Col xs={10}>
                    <EditorState>
                        <DocEditor />
                    </EditorState>
                </Col>
            </Row>
            <Row style={footerStyles} align="center" justify="between">
                <Col sm={4}>
                    <h4>Action: User 1 editing</h4>
                </Col>
                <Col style={{ justifyContent: "end" }} sm={4}>
                    <Popup trigger={<Button>Active Users</Button>}>
                        <Popup.Content>
                            <Item.Group>
                                <Item>
                                    <Hidden xs>
                                        <Item.Image
                                            size="mini"
                                            src={AvatarImg}
                                        />
                                    </Hidden>
                                    <Item.Content verticalAlign="middle">
                                        <Item.Header>User 1</Item.Header>
                                    </Item.Content>
                                </Item>
                                <Item>
                                    <Hidden xs>
                                        <Item.Image
                                            size="mini"
                                            src={AvatarImg}
                                        />
                                    </Hidden>
                                    <Item.Content verticalAlign="middle">
                                        <Item.Header>User 1</Item.Header>
                                    </Item.Content>
                                </Item>
                            </Item.Group>
                        </Popup.Content>
                    </Popup>
                </Col>
            </Row>
        </div>
    );
};

export default Editor;
