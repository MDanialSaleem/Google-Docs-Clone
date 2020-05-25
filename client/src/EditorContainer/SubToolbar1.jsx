import React, { useContext } from "react";
import { Row, Col } from "react-grid-system";
import { Dropdown, Button } from "semantic-ui-react";
import { saveAs } from "file-saver";
import { useSlate } from "slate-react";
import { SOCKET_ACTIONS } from "../commonConstants";
import EditorContext from "./EditorContext/Context";

const FileDropdown = () => (
    <Dropdown text="File" color="white">
        <Dropdown.Menu>
            <Dropdown.Item text="Delete" />
            <Dropdown.Item text="Rename" />
        </Dropdown.Menu>
    </Dropdown>
);

const ExportDropdown = () => {
    const editor = useSlate();
    const onDownload = () => {
        const blob = new Blob([JSON.stringify(editor.children, null, 2)], {
            type: "text/plain;charset=utf-8",
        });
        saveAs(blob, "file.kaghaz");
    };
    return (
        <Dropdown text="Export">
            <Dropdown.Menu>
                <Dropdown.Item text="Download" onClick={onDownload} />
                <Dropdown.Item text="Email as Attachment" />
            </Dropdown.Menu>
        </Dropdown>
    );
};

const SubToolbar1 = (props) => {
    const editorContext = useContext(EditorContext);
    const onEditClick = (event) => {
        props.socket.emit(SOCKET_ACTIONS.EDIT_REQUEST, {}, function (payload) {
            if (payload.permission) {
                editorContext.setEdit(true);
            }
        });
    };
    return (
        <div style={{ background: "grey", padding: 5 }}>
            <Row align="center">
                <Col style={{ textAlign: "center" }} xs={3} md={3} lg={3}>
                    <FileDropdown />
                </Col>
                <Col style={{ textAlign: "center" }} xs={3} md={3} lg={3}>
                    <ExportDropdown />
                </Col>
                <Col style={{ textAlign: "center" }} xs={3} md={3} lg={3}>
                    <Button>Collaborate</Button>
                </Col>
                <Col style={{ textAlign: "center" }} xs={3} md={3} lg={3}>
                    <Button onClick={onEditClick}>Edit</Button>
                </Col>
            </Row>
        </div>
    );
};

export default SubToolbar1;
