/** @jsx jsx */
import { jsx } from "@emotion/core";

import PropTypes from "prop-types";
import { Card, Image } from "semantic-ui-react";
const styles = {
    width: "150px",
    ":hover": {
        cursor: "pointer",
    },
};

const NewDocCard = (props) => {
    return (
        <div css={styles}>
            <Card>
                <Image src={props.imageUrl} fluid wrapped ui={false} />
                <Card.Content>
                    <Card.Header>{props.title}</Card.Header>
                </Card.Content>
            </Card>
        </div>
    );
};

NewDocCard.propTypes = {
    imageUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
};

export default NewDocCard;
