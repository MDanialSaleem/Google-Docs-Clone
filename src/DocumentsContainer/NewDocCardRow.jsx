import React from "react";
import NewDocCard from "./NewDocCard";
import Typography from '@material-ui/core/Typography';
import BlankImg from "../Assets/Images/Templates/Blank.png";
import ResumeImg from "../Assets/Images/Templates/Resume.png";
import {Row, Col} from "react-grid-system";
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
    <Row justify="center">
        <Col xs={3}>
            <Typography gutterBottom variant="h5" component="h2">
                Create A New Document        
            </Typography>
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
</div>

export default NewDocCardRow;