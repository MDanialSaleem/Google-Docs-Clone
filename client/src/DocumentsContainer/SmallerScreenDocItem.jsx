/** @jsx jsx */
import { jsx } from "@emotion/core";
import PropTypes from "prop-types";
import { Card, Icon } from "semantic-ui-react";
import SettingsDropdown from "./SettingsDropdown";

const styles = {
    margin: "10px 0px",
    padding: "5px 0px",
    ":hover": {
        cursor: "pointer",
    },
};
const SmallerScreenDocItem = (props) => {
    return (
        <div css={styles}>
            <Card>
                <Card.Content>
                    <Card.Header>
                        {props.name}
                        {props.isShared ? <Icon name="users" /> : null}
                        <SettingsDropdown
                            owner={props.owner}
                            id={props.id}
                        ></SettingsDropdown>
                    </Card.Header>
                    <Card.Description css={{ overflow: "hidden" }}>
                        {props.owner}
                    </Card.Description>
                    <Card.Description>{props.timeAccessed}</Card.Description>
                </Card.Content>
            </Card>
        </div>
    );
};

SmallerScreenDocItem.propTypes = {
    name: PropTypes.string.isRequired,
    isShared: PropTypes.bool.isRequired,
    owner: PropTypes.string.isRequired,
    timeAccessed: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
};
export default SmallerScreenDocItem;
