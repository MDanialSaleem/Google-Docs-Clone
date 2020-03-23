import React from "react";

export default {
    Leaf : props => {
        //the same effect can be achieved by using span element with css but we prefer 
        //strong here for semantic html.
        if(props.leaf.bold){
            return (
            <strong {...props.attributes}>
                {props.children}
            </strong>
            );
        }
        else {
            return (
                <span {...props.attributes}>
                  {props.children}
                </span>
            );
        }

    },

    DefaultElement : props => {
        return <p {...props.attributes}>{props.children}</p>
    }
};



