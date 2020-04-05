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
                <ColorChanger foreground={true} />
                <ColorChanger foreground={false} />
                <ToolbarButton
                    style={StyleConstants.BOLD}
                    activeFunction={CustomHelpers.isMarkActive}
                    toggleFunction={CustomHelpers.toggleMark}
                />
                <ToolbarButton
                    style={StyleConstants.ITALIC}
                    activeFunction={CustomHelpers.isMarkActive}
                    toggleFunction={CustomHelpers.toggleMark}
                />
                <ToolbarButton
                    style={StyleConstants.UNDERLINE}
                    activeFunction={CustomHelpers.isMarkActive}
                    toggleFunction={CustomHelpers.toggleMark}
                />
                <ToolbarButton
                    style={StyleConstants.HEADINE_ONE}
                    activeFunction={CustomHelpers.isBlockActive}
                    toggleFunction={CustomHelpers.toggleBlock}
                />
                <ToolbarButton
                    style={StyleConstants.HEADING_TWO}
                    activeFunction={CustomHelpers.isBlockActive}
                    toggleFunction={CustomHelpers.toggleBlock}
                />
                <ToolbarButton
                    style={StyleConstants.NUMBERED_LIST}
                    activeFunction={CustomHelpers.isBlockActive}
                    toggleFunction={CustomHelpers.toggleBlock}
                />
                <ToolbarButton
                    style={StyleConstants.BULLETTED_LIST}
                    activeFunction={CustomHelpers.isBlockActive}
                    toggleFunction={CustomHelpers.toggleBlock}
                />
                <ToolbarButton
                    style={StyleConstants.ALIGNMENT_VALUES.ALIGN_LEFT}
                    activeFunction={CustomHelpers.isAlignmentActive}
                    toggleFunction={CustomHelpers.toggleAlignment}
                />
                <ToolbarButton
                    style={StyleConstants.ALIGNMENT_VALUES.ALIGN_CENTER}
                    activeFunction={CustomHelpers.isAlignmentActive}
                    toggleFunction={CustomHelpers.toggleAlignment}
                />
                <ToolbarButton
                    style={StyleConstants.ALIGNMENT_VALUES.ALIGN_RIGHT}
                    activeFunction={CustomHelpers.isAlignmentActive}
                    toggleFunction={CustomHelpers.toggleAlignment}
                />
            </Col>
        </Row>
    </>
);

export default SubToolBar2;
