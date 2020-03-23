import React from "react";
import CustomElements from "./CustomElements";


export default {
    elementRenderer : props => {
        switch (props.element.type) {
        default:
            return <CustomElements.DefaultElement {...props} />
        }
    },
    leafRenderer : props => {
        return <CustomElements.Leaf {...props} />
    }
};


