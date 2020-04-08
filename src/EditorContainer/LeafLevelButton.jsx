import React from "react";
import CustomHelpers from "./EditorUtils/CustomHelpers";
import {useSlate} from "slate-react";
import {Button} from "semantic-ui-react";
import PropTypes from "prop-types";


const LeafLevelButton = props => {
    const editor = useSlate();
    let active = CustomHelpers.isMarkActive(editor, props.effect);
    let styles = {};
    if (active) {
        styles = {
            color: "blue"
        };
    }
    return (
        <Button
            onMouseDown={event => {
                event.preventDefault();
                CustomHelpers.toggleMark(editor, props.effect);
            }}
            style={styles}
        >
            {props.effect[0]}
        </Button>
    );
};

LeafLevelButton.propTypes = {
    effect: PropTypes.string.isRequired
};

export default LeafLevelButton;