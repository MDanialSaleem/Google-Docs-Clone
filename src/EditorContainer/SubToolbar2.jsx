import React from "react";
import {Row, Col} from "react-grid-system";


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
                <button><strong>B</strong></button>
                <span>|</span>
                <button><em>I</em></button>
                <span>|</span>
                <button><u>U</u></button>
            </Col>
            <Col sm={1}>
                {/* placeholder for color picker. */}
            <span style={{color: "blue", backgroundColor: "blue"}}>PL</span>
            </Col>
        </Row>
    </>
);

export default SubToolBar2;