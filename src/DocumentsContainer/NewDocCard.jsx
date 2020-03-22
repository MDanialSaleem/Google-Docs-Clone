import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import PropTypes from "prop-types";

const styles = {
    width : "150px"
};

const NewDocCard = props => {
  return (
    <div style={styles}>
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