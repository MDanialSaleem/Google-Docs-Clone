import React from "react";
import EditorState from "./EditorContext/State";
import UpEditor from "./UpEditor";

export default (props) => (
    <EditorState>
        <UpEditor docID={props.match.params.id} />
    </EditorState>
);
