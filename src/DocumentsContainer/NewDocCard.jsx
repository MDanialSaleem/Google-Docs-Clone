/** @jsx jsx */
import { jsx } from "@emotion/core";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import PropTypes from "prop-types";
import {useHistory} from "react-router-dom";
import {Editor} from "../Utils/RoutingConstants";

const styles = {
    width : "150px",
    ":hover": {
      cursor: "pointer"
    }
};

const NewDocCard = props => {
  const history = useHistory();
  const onClickHandler = () => history.push(Editor);

  return (
    <div css={styles} onClick={onClickHandler}>
        <Card>
            <CardMedia
              component="img"
              alt={props.title}
              height="140"
              image={props.imageUrl}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {props.title}
              </Typography>
            </CardContent>
        </Card>
    </div>
  );
}


NewDocCard.propTypes = {
    imageUrl : PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
};

export default NewDocCard;