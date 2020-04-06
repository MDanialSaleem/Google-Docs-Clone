import React from "react";
import { useSlate } from "slate-react";
import { Icon } from "semantic-ui-react";
import PropTypes from "prop-types";

const ToolbarButton = (props) => {
    const editor = useSlate();
    const active = props.activeFunction(editor, props.style);

    let styles = { cursor: "pointer", margin: "5px 0px" };
    const onClickHandler = (event) => {
        event.preventDefault();
        props.toggleFunction(editor, props.style);
    };

    return (
        <Icon
            onMouseDown={onClickHandler}
            style={styles}
            circular
            inverted={active}
            name={props.icon}
        />
    );
};

ToolbarButton.propTypes = {
    style: PropTypes.string.isRequired,
    activeFunction: PropTypes.func.isRequired,
    toggleFunction: PropTypes.func.isRequired,
    icon: PropTypes.string.isRequired,
};

export default ToolbarButton;
