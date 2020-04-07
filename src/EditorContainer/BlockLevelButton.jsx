import React from "react";
import {useSlate} from "slate-react";
import {Button} from "semantic-ui-react";
import CustomHelpers from "./EditorUtils/CustomHelpers";
import PropTypes from "prop-types";

const BlockLevelButton = props => {
    const editor = useSlate();
    return (
        <Button
            onMouseDown={event => {
                event.preventDefault();
                CustomHelpers.toggleBlock(editor, props.effect);
            }}
        >
            {props.effect[0]}
        </Button>
    );
};

BlockLevelButton.prototype = {
    effect: PropTypes.string.isRequired
};

export default BlockLevelButton;