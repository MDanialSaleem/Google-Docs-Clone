/** @jsx jsx */
import { jsx } from "@emotion/core";
import PropTypes from "prop-types";
import {Row, Col} from "react-grid-system";
import MoreVerticalIcon from "@material-ui/icons/MoreVert";
import DocumentIcon from "@material-ui/icons/Description";
import TextIcon from "@material-ui/icons/TextFormat";
import PeopleIcon from "@material-ui/icons/People";
import {useHistory} from "react-router-dom";
import { Editor } from "../Utils/RoutingConstants";

const DocumentItem = props => {
    const styles = {
        margin: "10px 0px",
        padding: "5px 0px",
        ":hover": {
            backgroundColor: "lightblue",
            cursor: "pointer"
        }
    };

    const history = useHistory();
    const onClickHandler = () => history.push(Editor);

    return (
        <div css={styles} onClick={onClickHandler}>
            <Row>
                <Col sm={1}>{props.type === "doc" ? <DocumentIcon /> : <TextIcon />}</Col>
                <Col sm={5}>
                    <Row justify="start">
                        <Col xs="content">
                            {props.name}
                        </Col>
                        <Col xs={1}>
                            {props.isShared ? <PeopleIcon /> : null } 
                        </Col>
                    </Row>
                </Col>
                <Col sm={2}>{props.owner}</Col>
                <Col sm={2}>{props.timeAccessed}</Col>
                <Col sm={2}><MoreVerticalIcon /></Col>
            </Row>
        </div>
    );
};

DocumentItem.propTypes  = {
    type: PropTypes.oneOf(['doc', 'txt']).isRequired,
    name: PropTypes.string.isRequired,
    isShared: PropTypes.bool.isRequired,
    owner: PropTypes.string.isRequired,
    timeAccessed: PropTypes.string.isRequired,
}

DocumentItem.defaultProps = {
    type: "doc"
}

export default DocumentItem;