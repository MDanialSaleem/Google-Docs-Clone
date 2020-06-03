import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Row, Col } from "react-grid-system";
import { Dropdown, Button, Modal } from "semantic-ui-react";
import { saveAs } from "file-saver";
import { useSlate } from "slate-react";
import { SOCKET_ACTIONS } from "../commonConstants";
import EditorContext from "./EditorContext/Context";
import ShareModal from "../SharedComponents/ShareModal";
import htmlDocx from "html-docx-js/dist/html-docx";
import { Documents } from "../Utils/RoutingConstants";

const FileDropdown = () => {
    const editor = useSlate();
    const history = useHistory();
    const onDownload = () => {
        const blob = new Blob([JSON.stringify(editor.children, null, 2)], {
            type: "text/plain;charset=utf-8",
        });
        saveAs(blob, "file.kaghaz");
    };
    const onClose = () => history.push(Documents);
    return (
        <Dropdown text="File" color="white">
            <Dropdown.Menu>
                <Dropdown.Item text="Download" onClick={onDownload} />
                <Dropdown.Item text="Close" onClick={onClose} />
            </Dropdown.Menu>
        </Dropdown>
    );
};
const ExportDropdown = (props) => {
    const onDocxDownload = () => {
        var converted = htmlDocx.asBlob(
            `<!doctype html>
                <html lang="en">
                    <head>
                        <meta charset="utf-8">
                        <title>File</title>
                    </head>
                    <body>
                        ${props.htmlLoader()}
                    </body>
                </html>`,
            {
                orientation: "landscape",
                margins: { top: 720 },
            }
        );
        saveAs(converted, "test.docx");
    };
    const onHTMLDownload = () => {
        const htmlRep = `<!doctype html>
                <html lang="en">
                    <head>
                        <meta charset="utf-8">
                        <title>File</title>
                    </head>
                    <body>
                        ${props.htmlLoader()}
                    </body>
                </html>`;
        const blob = new Blob([htmlRep], {
            type: "text/plain;charset=utf-8",
        });
        saveAs(blob, "file.html");
    };
    return (
        <Dropdown text="Export">
            <Dropdown.Menu>
                <Dropdown.Item
                    text="Download as HTML"
                    onClick={onHTMLDownload}
                />
                <Dropdown.Item
                    text="Download as DOCX"
                    onClick={onDocxDownload}
                />
            </Dropdown.Menu>
        </Dropdown>
    );
};

const SubToolbar1 = (props) => {
    const editorContext = useContext(EditorContext);
    const [shareOpen, setShareOpen] = useState(false);
    const onShareOpen = () => setShareOpen(true);
    const onShareClose = () => setShareOpen(false);

    const onEditClick = () => {
        props.socket.emit(
            SOCKET_ACTIONS.EDIT_REQUEST,
            { documentId: props.docID, token: window.localStorage.token },
            (payload) => {
                if (payload.permission) {
                    editorContext.setEdit(true);
                }
            }
        );
    };

    const onViewClick = () => {
        props.socket.emit(
            SOCKET_ACTIONS.VIEW_REQUEST,
            { documentId: props.docID, token: window.localStorage.token },
            (payload) => {
                if (payload.permission) {
                    editorContext.setEdit(false);
                }
            }
        );
    };
    const styles = { textAlign: "center", marginBottom: "5px" };
    return (
        <div style={{ background: "grey", padding: 5 }}>
            <Row align="center">
                <Col style={styles} xs={6} md={2}>
                    <FileDropdown />
                </Col>
                <Col style={styles} xs={6} md={2}>
                    <ExportDropdown htmlLoader={props.htmlLoader} />
                </Col>
                <Col style={styles} xs={6} md={2}>
                    <Modal trigger={<Button>Help</Button>} closeIcon>
                        <Modal.Header>Help</Modal.Header>
                        <Modal.Content image>
                            <Modal.Description>
                                <ul>
                                    <li>
                                        Use the toolbar with with icons to
                                        insert formatted text.
                                    </li>
                                    <li>
                                        To edit the document, press the edit
                                        button, if no one else is editing you
                                        will be able to edit the document.
                                    </li>
                                    <li>
                                        After you are done editing please let go
                                        of the edit rights by clicking the View
                                        button.
                                    </li>
                                    <li>
                                        You can add collaborators, export
                                        document and see who else is editing by
                                        clicking on the requried button.
                                    </li>
                                </ul>
                            </Modal.Description>
                        </Modal.Content>
                    </Modal>
                </Col>
                <Col style={styles} xs={6} md={2}>
                    <Button disabled={!props.isOwner} onClick={onShareOpen}>
                        Collaborate
                    </Button>
                    <ShareModal
                        id={props.docID}
                        onClose={onShareClose}
                        open={shareOpen}
                    />
                </Col>
                <Col style={styles} xs={6} md={2}>
                    <Button.Group>
                        <Button
                            disabled={editorContext.editable}
                            onClick={onEditClick}
                        >
                            Edit
                        </Button>
                        <Button.Or text="" />
                        <Button
                            disabled={!editorContext.editable}
                            onClick={onViewClick}
                        >
                            View
                        </Button>
                    </Button.Group>
                </Col>
            </Row>
        </div>
    );
};

export default SubToolbar1;
