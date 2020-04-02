import React, { useState } from "react";
import { Row, Col } from "react-grid-system";
import { useSlate } from "slate-react";
import { Button } from "semantic-ui-react";
import CustomHelpers from "./EditorUtils/CustomHelpers";
import Fonts from "../Utils/Fonts";

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

const BlockLevelButton = props => {
    const editor = useSlate();
    return (
        <Button
            active={CustomHelpers.isBlockActive(editor, props.effect)}
            onMouseDown={event => {
                event.preventDefault();
                CustomHelpers.toggleBlock(editor, props.effect);
            }}
        >
            {props.effect[0]}
        </Button>
    );
};

const FontChanger = () => {
    const editor = useSlate();
    const [value, changeValue] = useState(Fonts.Arial);

    const handleChange = event => {
        changeValue(event.target.value);
        CustomHelpers.toggleMark(editor, "font", event.target.value);
    };
    return (
        <select value={value} onChange={handleChange}>
            <option value={Fonts.Arial}>Arial</option>
            <option value={Fonts.Monospace}>Monospace</option>
            <option value={Fonts.TimesNewRoman}>TimesNewRoman</option>
            <option value={Fonts.Impact}>Impact</option>
        </select>
    );
};

const FontSizeChanger = () => {
    const editor = useSlate();
    const [value, changeValue] = useState(15);

    const handleChange = event => {
        changeValue(event.target.value);
        CustomHelpers.toggleMark(editor, "fontsize", event.target.value);
    };

    return (
        <input
            type="number"
            defaultValue={value}
            min="1"
            onKeyUp={handleChange}
            onChange={handleChange}
        />
    );
};

const SubToolBar2 = () => (
    <>
        <Row>
            <Col md={3}>
                <FontChanger />
            </Col>
            <Col md={2}>
                <FontSizeChanger />
            </Col>
            <Col md={2}>
                <LeafLevelButton effect="bold" />
                <LeafLevelButton effect="italic" />
                <LeafLevelButton effect="underline" />
            </Col>
            <Col md={1}>
                {/* placeholder for color picker. */}
                <span style={{ color: "blue", backgroundColor: "blue" }}>
                    PL
                </span>
            </Col>
            <Col md={3}>
                <BlockLevelButton effect="heading-one" />
                <BlockLevelButton effect="heading-two" />
                <BlockLevelButton effect="numbered-list" />
                <BlockLevelButton effect="bulleted-list" />
            </Col>
        </Row>
    </>
);

export default SubToolBar2;
