import React, {useState} from "react";
import {Row, Col} from "react-grid-system";
import {useSlate} from "slate-react";
import {Button} from "semantic-ui-react";
import CustomHelpers from "./EditorUtils/CustomHelpers";
import Fonts from "../Utils/Fonts";

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
};

const FontChanger = () => {
  const editor = useSlate();
  const [value, changeValue] = useState(Fonts.Arial);
  
  const handleChange = (event) => {
    changeValue(event.target.value);
    CustomHelpers.toggleMark(editor, "font", event.target.value);
  }
    return (
      <select value={value} onChange={handleChange}>
        <option value={Fonts.Arial}>Arial</option>
        <option value={Fonts.Monospace}>Monospace</option>
        <option value={Fonts.TimesNewRoman}>TimesNewRoman</option>
        <option value={Fonts.Impact}>Impact</option>
      </select>
    );
};

const SubToolBar2 = () => (
    <>
        <Row>
            <Col sm={3}>
              <FontChanger />
            </Col>
            <Col sm={2}>
                <input type="number" defaultValue={10} />
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