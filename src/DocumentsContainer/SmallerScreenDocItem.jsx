/** @jsx jsx */
import { jsx } from "@emotion/core";
import PropTypes from "prop-types";
import {useHistory} from "react-router-dom";
import {Editor} from "../Utils/RoutingConstants";
import { Card, Image, Icon } from 'semantic-ui-react'

const styles = {
    width : "150px",
    ":hover": {
      cursor: "pointer"
    }
};

const SmallerScreenDocItem = props => {
  const history = useHistory();
  const onClickHandler = () => history.push(Editor);

  return (
    <div css={styles} onClick={onClickHandler}>
      <Card onClick={onClickHandler} >
        <Image src={props.DocIcon} fluid wrapped ui={false} />
        <Card.Content>
          <Card.Header>{props.title}</Card.Header>
          <Card.Description>{"Owner: " + props.owner}</Card.Description>
          <Card.Description>{"Time Accessed: " + props.timeAccessed}</Card.Description>
          
        </Card.Content>
      </Card>
    </div>

  );
}

SmallerScreenDocItem.propTypes = {
    DocIcon : PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    timeAccessed: PropTypes.string.isRequired,
    owner: PropTypes.string.isRequired,
};

export default SmallerScreenDocItem;