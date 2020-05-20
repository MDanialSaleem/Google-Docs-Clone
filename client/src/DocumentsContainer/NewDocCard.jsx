/** @jsx jsx */
import { jsx } from "@emotion/core";
import axios from "axios";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { Editor } from "../Utils/RoutingConstants";
import { Card, Image } from "semantic-ui-react";
import { loadUser } from "../Store/Actions/Auth";
const styles = {
    width: "150px",
    ":hover": {
        cursor: "pointer",
    },
};

const NewDocCard = (props) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const onClickHandler = async () => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const body = JSON.stringify({
            name: "Untitled",
        });

        try {
            await axios.post("/api/documents/", body, config);
            dispatch(loadUser());
        } catch (err) {
            alert("error");
            console.log(JSON.stringify(err));
        }
    };

    return (
        <div css={styles}>
            <Card onClick={onClickHandler}>
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
