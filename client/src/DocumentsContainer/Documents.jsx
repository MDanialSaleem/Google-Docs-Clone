import React from "react";
import DocumentList from "./DocumentsList";
import NewDocCardRow from "./NewDocCardRow";
import { Container } from "react-grid-system";

const Documnets = () => (
    <Container fluid>
        <NewDocCardRow />
        <DocumentList />
    </Container>
);

export default Documnets;
