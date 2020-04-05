import React from "react";
import { Row, Col } from "react-grid-system";
import StyleConstants from "./EditorUtils/StyleConstants";
import LeafLevelButton from "./LeafLevelButton";
import BlockLevelButton from "./BlockLevelButton";
import ColorChanger from "./ColorChanger";
import FontChanger from "./FontChanger";
import FontSizeChanger from "./FontSizeChanger";

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
                <ColorChanger foreground={true} />
            </Col>
            <Col md={1}>
                <ColorChanger foreground={false} />
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
