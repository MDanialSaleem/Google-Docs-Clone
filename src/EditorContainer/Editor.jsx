/** @jsx jsx */
import { jsx } from "@emotion/core";
import Toolbar from "./Toolbar";
import DocEditor from "./DocEditor";
import {Row, Col} from "react-grid-system";

const Editor = () => {
    const style = {
        marginTop: "50px"
    }
    return (
    <div>
        <Toolbar />
        <Row css={style} justify="center">
            <Col style={{backgroundColor:"lightgrey"}}  xs={10}>
                <DocEditor />
            </Col>
        </Row>
    </div>
    );
};


export default Editor;