import React, { useState } from "react";
import { Row, Col } from "react-grid-system";
import { useSlate } from "slate-react";
import CustomHelpers from "./EditorUtils/CustomHelpers";
import Fonts from "./EditorUtils/Fonts";
import { Popup, Button } from "semantic-ui-react";
import { CirclePicker } from 'react-color';
import StyleConstants from "./EditorUtils/StyleConstants";

const ColorChanger = () => {
    const editor = useSlate();

    const onClickHandler = (color, event) => {
        event.preventDefault();
        CustomHelpers.toggleMark(editor, StyleConstants.TEXT_COLOR, color.hex);
    };

    return (
        <Popup trigger={<Button>C</Button>} position="bottom center" hoverable>
            <Popup.Header>Pick Text Color</Popup.Header>
            <Popup.Content>
                <CirclePicker onChangeComplete={ onClickHandler } />
            </Popup.Content>
        </Popup>
    );
};

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
        CustomHelpers.toggleMark(editor, StyleConstants.FONT, event.target.value);
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
        CustomHelpers.toggleMark(editor, StyleConstants.FONT_SIZE, event.target.value);
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
            <Col md={2}>
                <FontChanger />
            </Col>
            <Col md={2}>
                <FontSizeChanger />
            </Col>
            <Col md={2}>
                <LeafLevelButton effect={StyleConstants.BOLD} />
                <LeafLevelButton effect={StyleConstants.ITALIC} />
                <LeafLevelButton effect={StyleConstants.UNDERLINE} />
            </Col>
            <Col md={1}>
                <ColorChanger />
            </Col>
            <Col md={4}>
                <BlockLevelButton effect={StyleConstants.HEADINE_ONE} />
                <BlockLevelButton effect={StyleConstants.HEADING_TWO} />
                <BlockLevelButton effect={StyleConstants.NUMBERED_LIST} />
                <BlockLevelButton effect={StyleConstants.BULLETTED_LIST} />
            </Col>
        </Row>
    </>
);

export default SubToolBar2;
