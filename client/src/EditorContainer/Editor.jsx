/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useState, useMemo, useEffect } from "react";
import axios from "axios";
import openSocket from "socket.io-client";
//Own Components.
import { SOCKET_ACTIONS } from "../commonConstants";
import Toolbar from "./Toolbar";
import DocEditor from "./DocEditor";
import { Row, Col } from "react-grid-system";
import EditorFooter from "./EditorFooter";
import EditorState from "./EditorContext/State";
import { createEditor } from "slate";
import { withHistory } from "slate-history";
import { Slate, withReact } from "slate-react";
import SubToolBar2 from "./SubToolbar2";
import { useContext } from "react";
import EditorContext from "./EditorContext/Context";

const Editor = (props) => {
    const style = {
        marginTop: "50px",
    };

    const [value, setValue] = useState(null);
    const [name, setName] = useState(null);
    const [socket, setSocket] = useState(null);
    const [loading, setLoading] = useState(true);
    const editor = useMemo(() => withHistory(withReact(createEditor())), []);
    const [onlineUsers, setOnlineUsers] = useState([]);

    useEffect(() => {
        // because effects cannot direcrlt use aync functions.
        const fetchDoc = async (id) => {
            try {
                const res = await axios.get("/api/documents/" + id);
                setName(res.data.name);
                setValue(res.data.content);
                setLoading(false);
            } catch (err) {
                console.log(err);
            }
        };
        fetchDoc(props.match.params.id);
    }, []);

    useEffect(() => {
        let socket = openSocket();
        socket.emit(SOCKET_ACTIONS.JOIN_ROOM, {
            document: props.match.params.id,
            token: window.localStorage.token,
        });
        socket.on(SOCKET_ACTIONS.UPDATE_VALUE, (payload) => {
            setValue(payload.newValue);
        });
        socket.on(SOCKET_ACTIONS.JOIN_ACCEPTED, (payload) => {
            console.log(payload);
            setValue(payload.newValue);
            setOnlineUsers(payload.onlineUsers);
        });
        socket.on(SOCKET_ACTIONS.USERS_CHANGED, (payload) => {
            setOnlineUsers(payload.onlineUsers);
        });
        setSocket(socket);
        return () => {
            socket.emit(SOCKET_ACTIONS.LEAVE_ROOM, {
                document: props.match.params.id,
                token: window.localStorage.token,
            });
            socket.disconnect(true);
        };
    }, []);

    const onChangeEventHandler = (value) => {
        setValue(value);
        socket.emit(SOCKET_ACTIONS.UPDATE_VALUE, {
            newValue: value,
            documentId: props.match.params.id,
        });
    };
    return !loading ? (
        <div>
            <EditorState>
                <Slate
                    editor={editor}
                    value={value}
                    onChange={onChangeEventHandler}
                >
                    <Toolbar name={name} />
                    <Row css={style} justify="center">
                        <Col xs={10}>
                            <SubToolBar2 />
                            <DocEditor />
                        </Col>
                    </Row>
                    <EditorFooter users={onlineUsers} />
                </Slate>
            </EditorState>
        </div>
    ) : (
        <div>Loading</div>
    );
};

export default Editor;
