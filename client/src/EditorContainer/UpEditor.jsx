/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useState, useMemo, useEffect, useContext, useRef } from "react";
import axios from "axios";
import openSocket from "socket.io-client";
import { useSelector } from "react-redux";
//Own Components.
import { SOCKET_ACTIONS } from "../commonConstants";
import Toolbar from "./Toolbar";
import DocEditor from "./DocEditor";
import { Row, Col } from "react-grid-system";
import EditorFooter from "./EditorFooter";
import { createEditor } from "slate";
import { withHistory } from "slate-history";
import { Slate, withReact } from "slate-react";
import SubToolBar2 from "./SubToolbar2";
import SubToolbar1 from "./SubToolbar1";
import EditorContext from "./EditorContext/Context";

const Editor = (props) => {
    const style = {
        marginTop: "50px",
    };

    const [value, setValue] = useState(null);
    const [name, setName] = useState(null);
    const [socket, setSocket] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeUser, setActiveUser] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [owner, setOwner] = useState(false);
    const editorContext = useContext(EditorContext);
    const editor = useMemo(() => withHistory(withReact(createEditor())), []);
    const currUserID = useSelector((state) => state.auth.user._id);
    const innerRef = useRef(null);

    useEffect(() => {
        // because effects cannot direcrlt use aync functions.
        const fetchDoc = async (id) => {
            try {
                const res = await axios.get("/api/documents/one" + id);
                setName(res.data.name);
                setValue(res.data.content);
                setOwner(res.data.owner === currUserID);
                setLoading(false);
            } catch (err) {
                console.log(err);
            }
        };
        fetchDoc(props.docID);
    }, []);

    useEffect(() => {
        let socket = openSocket();
        socket.emit(SOCKET_ACTIONS.JOIN_ROOM, {
            document: props.docID,
            token: window.localStorage.token,
        });
        socket.on(SOCKET_ACTIONS.UPDATE_VALUE, (payload) => {
            setValue(payload.newValue);
        });
        socket.on(SOCKET_ACTIONS.JOIN_ACCEPTED, (payload) => {
            setValue(payload.newValue);
            setOnlineUsers(payload.onlineUsers);
            editorContext.setEdit(payload.permission);
        });
        socket.on(SOCKET_ACTIONS.USERS_CHANGED, (payload) => {
            setOnlineUsers(payload.onlineUsers);
        });
        socket.on(SOCKET_ACTIONS.ACTIVE_CHANGED, (payload) => {
            setActiveUser(payload.active);
        });
        socket.on(SOCKET_ACTIONS.UPDATE_NAME, (payload) => {
            setName(payload.newName);
        });
        setSocket(socket);
        return () => {
            socket.emit(SOCKET_ACTIONS.LEAVE_ROOM, {
                document: props.docID,
                token: window.localStorage.token,
            });
            socket.disconnect(true);
        };
    }, []);

    const onChangeEventHandler = (value) => {
        setValue(value);
        socket.emit(SOCKET_ACTIONS.UPDATE_VALUE, {
            newValue: value,
            documentId: props.docID,
            token: window.localStorage.token,
        });
    };

    const onNameChnageHandler = (name) => {
        socket.emit(SOCKET_ACTIONS.UPDATE_NAME, {
            document: props.docID,
            newName: name,
        });
    };

    const htmlLoader = () => {
        return innerRef.current.innerHTML;
    };
    return !loading ? (
        <div>
            <Slate
                editor={editor}
                value={value}
                onChange={onChangeEventHandler}
            >
                <Toolbar name={name} onSubmit={onNameChnageHandler} />
                <SubToolbar1
                    socket={socket}
                    docID={props.docID}
                    isOwner={owner}
                    htmlLoader={htmlLoader}
                />
                <Row css={style} justify="center">
                    <Col xs={10}>
                        <SubToolBar2 />
                        <div ref={innerRef}>
                            <DocEditor />
                        </div>
                    </Col>
                </Row>
                <EditorFooter active={activeUser} users={onlineUsers} />
            </Slate>
        </div>
    ) : (
        <div>Loading</div>
    );
};

export default Editor;
