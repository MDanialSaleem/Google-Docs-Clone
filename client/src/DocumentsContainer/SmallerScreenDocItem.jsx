/** @jsx jsx */
import { jsx } from "@emotion/core";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { Editor } from "../Utils/RoutingConstants";
import {
    Card,
    Image,
    Icon,
    Dropdown,
    CardDescription,
} from "semantic-ui-react";

const DropdownSettings = () => (
    <Dropdown icon="ellipsis vertical" css={iconStyle2}>
        <Dropdown.Menu>
            <Dropdown.Header content="settings" />
            <Dropdown.Item text="Delete" />
            <Dropdown.Item text="Rename" />
        </Dropdown.Menu>
    </Dropdown>
);

const styles = {
    width: "150px",
    ":hover": {
        cursor: "pointer",
    },
};

const iconStyle1 = {
    paddingLeft: 21,
};

const iconStyle2 = {
    paddingLeft: 18,
};

const SmallerScreenDocItem = (props) => {
    const history = useHistory();
    const onClickHandler = () => history.push(Editor);

    return (
        <div css={styles} onClick={onClickHandler}>
            <Card onClick={onClickHandler}>
                <Image src={props.DocIcon} fluid wrapped ui={false} />
                <Card.Content>
                    <Card.Header>
                        {props.title} <Icon name="users" css={iconStyle1} />
                        <DropdownSettings />
                    </Card.Header>
                    <Card.Description>
                        {"Owner: " + props.owner}
                    </Card.Description>
                    <Card.Description>
                        {"Time Accessed: " + props.timeAccessed}
                    </Card.Description>
                    <Card.Description>
                        {props.isShared ? <Icon name="users" /> : null}
                    </Card.Description>
                </Card.Content>
            </Card>
        </div>
    );
};

SmallerScreenDocItem.propTypes = {
    type: PropTypes.oneOf(["doc", "txt"]).isRequired,
    name: PropTypes.string.isRequired,
    isShared: PropTypes.bool.isRequired,
    owner: PropTypes.string.isRequired,
    timeAccessed: PropTypes.string.isRequired,
};

SmallerScreenDocItem.defaultProps = {
    type: "doc",
};

export default SmallerScreenDocItem;
