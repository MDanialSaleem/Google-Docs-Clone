import React from "react";
import StyleConstants from "./StyleConstants";

export default {
    Leaf: ({ attributes, children, leaf }) => {
        let styles = {};

        if (leaf[StyleConstants.BOLD]) {
            children = <strong>{children}</strong>;
        }

        if (leaf[StyleConstants.ITALIC]) {
            children = <em>{children}</em>;
        }

        if (leaf[StyleConstants.ITALIC]) {
            children = <u>{children}</u>;
        }

        if (leaf[StyleConstants.FONT]) {
            styles = {
                ...styles,
                fontFamily: leaf[StyleConstants.FONT]
            };
        }

        if (leaf[StyleConstants.TEXT_COLOR]) {
            styles = {
                ...styles,
                color: leaf[StyleConstants.TEXT_COLOR]
            };
        }

        if(leaf[StyleConstants.FONT_SIZE]) {
            styles = {
                ...styles,
                fontSize: leaf[StyleConstants.FONT_SIZE] + "px"
            };
        }

        return (
            <span style={styles} {...attributes}>
                {children}
            </span>
        );
    },

    Element: ({ attributes, children, element }) => {

        let alignStyles = {
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
        };

        switch(element[StyleConstants.ALIGNMENT]) {
            case StyleConstants.ALIGNMENT_TYPE.ALIGN_LEFT:
                alignStyles.justifyContent = "left";
                break;
            case StyleConstants.ALIGNMENT_TYPE.ALIGN_CENTER:
                alignStyles.justifyContent = "center";
                break;
            case StyleConstants.ALIGNMENT_TYPE.ALIGN_RIGHT:
                alignStyles.justifyContent = "right";
                break;
            default:

        }

        switch (element.type) {
            case StyleConstants.BULLETTED_LIST:
                return <ul style={alignStyles}  {...attributes}>{children}</ul>;
            case StyleConstants.HEADINE_ONE:
                return <h1 style={alignStyles}  {...attributes}>{children}</h1>;
            case StyleConstants.HEADING_TWO:
                return <h2 style={alignStyles}  {...attributes}>{children}</h2>;
            case StyleConstants.LIST_ITEM:
                return <li  {...attributes}>{children}</li>;
            case StyleConstants.NUMBERED_LIST:
                return <ol style={alignStyles}  {...attributes}>{children}</ol>;
            default:
                return <p  style={alignStyles} {...attributes}>{children}</p>;
        }
    },
    DefaultElement: props => {
        return <p {...props.attributes}>{props.children}</p>;
    }
};
