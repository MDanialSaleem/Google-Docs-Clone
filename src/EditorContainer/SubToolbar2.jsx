import React from "react";
import { Row, Col } from "react-grid-system";
import StyleConstants from "./EditorUtils/StyleConstants";
import ColorChanger from "./ColorChanger";
import FontChanger from "./FontChanger";
import FontSizeChanger from "./FontSizeChanger";
import ToolbarButton from "./ToolbarButton";
import CustomHelpers from "./EditorUtils/CustomHelpers";

const SubToolBar2 = () => (
    <>
        <Row justify="start">
            <Col sm={4} lg={2}>
                <FontChanger />
            </Col>
            <Col sm={4} lg={2}>
                <FontSizeChanger />
            </Col>
            <Col sm={12} lg={8}>
                <ColorChanger />
                <ToolbarButton
                    style={StyleConstants.BOLD}
                    activeFunction={CustomHelpers.isMarkActive}
                    toggleFunction={CustomHelpers.toggleMark}
                    icon="bold"
                />
                <ToolbarButton
                    style={StyleConstants.ITALIC}
                    activeFunction={CustomHelpers.isMarkActive}
                    toggleFunction={CustomHelpers.toggleMark}
                    icon="italic"
                />
                <ToolbarButton
                    style={StyleConstants.UNDERLINE}
                    activeFunction={CustomHelpers.isMarkActive}
                    toggleFunction={CustomHelpers.toggleMark}
                    icon="underline"
                />
                <ToolbarButton
                    style={StyleConstants.HEADINE_ONE}
                    activeFunction={CustomHelpers.isBlockActive}
                    toggleFunction={CustomHelpers.toggleBlock}
                    icon="heading"
                />
                <ToolbarButton
                    style={StyleConstants.HEADING_TWO}
                    activeFunction={CustomHelpers.isBlockActive}
                    toggleFunction={CustomHelpers.toggleBlock}
                    icon="h"
                />
                <ToolbarButton
                    style={StyleConstants.NUMBERED_LIST}
                    activeFunction={CustomHelpers.isBlockActive}
                    toggleFunction={CustomHelpers.toggleBlock}
                    icon="numbered list"
                />
                <ToolbarButton
                    style={StyleConstants.BULLETTED_LIST}
                    activeFunction={CustomHelpers.isBlockActive}
                    toggleFunction={CustomHelpers.toggleBlock}
                    icon="unordered list"
                />
                <ToolbarButton
                    style={StyleConstants.ALIGNMENT_VALUES.ALIGN_LEFT}
                    activeFunction={CustomHelpers.isAlignmentActive}
                    toggleFunction={CustomHelpers.toggleAlignment}
                    icon="align left"
                />
                <ToolbarButton
                    style={StyleConstants.ALIGNMENT_VALUES.ALIGN_CENTER}
                    activeFunction={CustomHelpers.isAlignmentActive}
                    toggleFunction={CustomHelpers.toggleAlignment}
                    icon="align center"
                />
                <ToolbarButton
                    style={StyleConstants.ALIGNMENT_VALUES.ALIGN_RIGHT}
                    activeFunction={CustomHelpers.isAlignmentActive}
                    toggleFunction={CustomHelpers.toggleAlignment}
                    icon="align right"
                />
            </Col>
        </Row>
    </>
);

export default SubToolBar2;
