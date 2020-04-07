import React from "react";
import {Row, Col} from "react-grid-system";
import { Dropdown, Button } from "semantic-ui-react";

const FileDropdown = () => (
    <Dropdown text="File" color="white">
        <Dropdown.Menu>
            <Dropdown.Item text="Delete"/>
            <Dropdown.Item text="Rename"/>
        </Dropdown.Menu>
    </Dropdown>
)

const ExportDropdown = () => (
    <Dropdown text="Export">
        <Dropdown.Menu>
            <Dropdown.Item text="Download"/>
            <Dropdown.Item text="Email as Attachment"/>
        </Dropdown.Menu>
    </Dropdown>
)

const SubToolbar1 = () => (
    <div style={{background: "grey", padding: 5}}>
        <Row align="center">
            <Col style={{textAlign: "center"}} xs={3} md={3} lg={3}><FileDropdown/></Col>
            <Col style={{textAlign: "center"}} xs={3} md={3} lg={3}><ExportDropdown/></Col>
            <Col style={{textAlign: "center"}} xs={3} md={3} lg={3}><Button>Collaborate</Button></Col>
            <Col style={{textAlign: "center"}} xs={3} md={3} lg={3}><Button>Help</Button></Col>
        </Row>
    </div>
);


export default SubToolbar1;
