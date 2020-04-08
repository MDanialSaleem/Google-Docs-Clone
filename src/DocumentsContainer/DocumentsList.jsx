import React from "react";
import DocumentItem from "./DocumentItem";
import SmallerScreenDocItem from "./SmallerScreenDocItem";
import { Row, Col, Hidden, Visible } from "react-grid-system";
import Image from "../Assets/Images/Templates/Doc.png"
import { Container } from "semantic-ui-react";

const DocumentList = () => {
    return (
        <div>
            <Row justify="center">
                <Hidden sm xs>
                    <Col xs={8}>
                        {[...Array(50).keys()].map((val, index) => 
                            <DocumentItem 
                                type={index % 2 === 0? 'doc' : 'txt'}
                                name={"File" + index}
                                owner="me"
                                isShared={index % 2 === 0}
                                timeAccessed="4:53 PM"
                            />
                        )}
                    </Col>
                </Hidden>              
            </Row>

            <Visible sm xs>
                <Container fluid>
                    <Row align="start" debug xs={12} sm={4}>
                        {[...Array(50).keys()].map((val, index) =>
                            <Col style={{padding: "5px 5px"}}>
                                <SmallerScreenDocItem                                       
                                    name={"File" + index}
                                    owner="me"
                                    timeAccessed="4:53 PM"
                                    title={"File" + index}
                                    DocIcon = { Image }
                                />
                            </Col>
                        )}
                    </Row>            
                </Container>
            </Visible>
        </div>  
    )
}

export default DocumentList;