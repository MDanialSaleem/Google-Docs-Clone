import React from "react";
import { useSlate } from "slate-react";
import { Button } from "semantic-ui-react";
import PropTypes from "prop-types";

const ToolbarButton = (props) => {
    const editor = useSlate();
    const active = props.activeFunction(editor, props.style);

    let styles = {};

    if (active) {
        styles = {
            color: "blue",
        };
    }

    return (
        <Button
            onMouseDown={(event) => {
                event.preventDefault();
                props.toggleFunction(editor, props.style);
            }}
            style={styles}
        >
            {props.style[0]}
        </Button>
    );
};

ToolbarButton.propTypes = {
    style: PropTypes.string.isRequired,
    activeFunction: PropTypes.func.isRequired,
    toggleFunction: PropTypes.func.isRequired,
};

export default ToolbarButton;
