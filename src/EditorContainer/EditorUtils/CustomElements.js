import React from "react";
import { Editor } from "slate";

export default {
    Leaf: ({ attributes, children, leaf }) => {
        let styles = {};

        if (leaf.bold) {
            children = <strong>{children}</strong>;
        }

        if (leaf.italic) {
            children = <em>{children}</em>;
        }

        if (leaf.underline) {
            children = <u>{children}</u>;
        }

        if (leaf.font) {
            styles = {
                ...styles,
                fontFamily: leaf.font
            };
        }

        if (leaf.color) {
            styles = {
                ...styles,
                color: "blue"
            };
        }

        if(leaf.fontsize) {
            styles = {
                ...styles,
                fontSize: leaf.fontsize + "px"
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

        switch(element.alignment) {
            case "left-align":
                alignStyles.justifyContent = "left";
                break;
            case "center-align":
                alignStyles.justifyContent = "center";
                break;
            case "right-align":
                alignStyles.justifyContent = "right";
                break;
            default:

        }

        switch (element.type) {
            case "bulleted-list":
                return <ul style={alignStyles}  {...attributes}>{children}</ul>;
            case "heading-one":
                return <h1 style={alignStyles}  {...attributes}>{children}</h1>;
            case "heading-two":
                return <h2 style={alignStyles}  {...attributes}>{children}</h2>;
            case "list-item":
                return <li  {...attributes}>{children}</li>;
            case "numbered-list":
                return <ol style={alignStyles}  {...attributes}>{children}</ol>;
            default:
                return <p  style={alignStyles} {...attributes}>{children}</p>;
        }
    },
    DefaultElement: props => {
        return <p {...props.attributes}>{props.children}</p>;
    }
};
