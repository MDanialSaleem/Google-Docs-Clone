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
            console.log(leaf.fontsize);
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
        switch (element.type) {
            case "bulleted-list":
                return <ul {...attributes}>{children}</ul>;
            case "heading-one":
                return <h1 {...attributes}>{children}</h1>;
            case "heading-two":
                return <h2 {...attributes}>{children}</h2>;
            case "list-item":
                return <li {...attributes}>{children}</li>;
            case "numbered-list":
                return <ol {...attributes}>{children}</ol>;
            default:
                return <p {...attributes}>{children}</p>;
        }
    },
    DefaultElement: props => {
        return <p {...props.attributes}>{props.children}</p>;
    }
};
