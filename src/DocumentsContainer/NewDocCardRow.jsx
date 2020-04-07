import React from "react";
import NewDocCard from "./NewDocCard";
import BlankImg from "../Assets/Images/Templates/Blank.png";
import ResumeImg from "../Assets/Images/Templates/Resume.png";
import {Row, Col, Hidden, Visible} from "react-grid-system";
import LetterImg from "../Assets/Images/Templates/Letter.png";
import ProjectProposalImg from "../Assets/Images/Templates/ProjectProposal.png";
import BrochureImg from "../Assets/Images/Templates/Brochure.png";
import RecipeImg from "../Assets/Images/Templates/Recipe.png";

const styles = {
    background : "lightgrey",
    padding: "20px 0px"
};

const NewDocCardRow = () => 
<div style={styles}>
    <Hidden sm xs>
        <Row style={{paddingBottom: "5px"}} justify="center">
            <Col xs={3}>
                    <h3>
                        Create A New Document
                    </h3>       
            </Col>
        </Row>

        <Row justify="center">
            <Col xs="content">
                <NewDocCard title="Blank" imageUrl={BlankImg}/>
            </Col>
            <Col xs="content">
                <NewDocCard title="Resume" imageUrl={ResumeImg}/>
            </Col>
            <Col xs="content">
                <NewDocCard title="Letter" imageUrl={LetterImg}/>
            </Col>
            <Col xs="content">
                <NewDocCard title="Project" imageUrl={ProjectProposalImg}/>
            </Col>
            <Col xs="content">
                <NewDocCard title="Brochure" imageUrl={BrochureImg}/>
            </Col>
            <Col xs="content">
                <NewDocCard title="Recipe" imageUrl={RecipeImg}/>
            </Col>
        </Row>
    </Hidden>

    <Visible sm xs>
        <Row justify="center">
            <Col xs="content">
                <NewDocCard title="Blank" imageUrl={BlankImg}/>
            </Col>
        </Row>
    </Visible>
</div>

export default NewDocCardRow;