import React from "react";
import {Row, Col} from "react-grid-system";
import {useSlate} from "slate-react";
import {Button} from "semantic-ui-react";
import CustomHelpers from "./EditorUtils/CustomHelpers";

const LeafLevelButton = (props) => {

    const editor = useSlate();
    let active=CustomHelpers.isMarkActive(editor, props.effect);
    let styles ={};
    if(active)
    {
      styles = {
        color: "blue"
      };
    }
    return (
      <Button
        onMouseDown={event => {
          event.preventDefault()
          CustomHelpers.toggleMark(editor, props.effect);
        }}
        style={styles}
      >
          {props.effect[0]}
      </Button>
    )
}


const SubToolBar2 = () => (
    <>
        <Row>
            <Col sm={1}>
                <select>
                    <option selected>Arial</option>
                    <option>Comic Sans</option>
                    <option>Calibri</option>
                </select>
            </Col>
            <Col sm={2}>
                <input type="number" value={10} />
            </Col>
            <Col sm={2}>
                <LeafLevelButton effect="bold" />
                <LeafLevelButton effect="italic" />
                <LeafLevelButton effect="underline" />
            </Col>
            <Col sm={1}>
                {/* placeholder for color picker. */}
            <span style={{color: "blue", backgroundColor: "blue"}}>PL</span>
            </Col>
        </Row>
    </>
);

export default SubToolBar2;