import React from "react";
import DocumentItem from "./DocumentItem";
import { Row, Col } from "react-grid-system";

const DocumentList = () => {
    return (
        <Row justify="center">
        <Col xs={8}>
            {[...Array(50).keys()].map((val, index) => 
                <DocumentItem 
                    type={index % 2 === 0? 'doc' : 'txt'}
                    name={"File" + index}
                    owner="me"
                    isShared={index % 2 === 0}
                    timeAccessed="4:53 PM"
                />
            )
            }
        </Col>
        </Row>
    )
}


export default DocumentList;