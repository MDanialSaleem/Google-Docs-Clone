import React from "react";
import { Dropdown } from "semantic-ui-react";
import RenameModal from "../SharedComponents/RenameModal";
import ShareModal from "../SharedComponents/ShareModal";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../Store/Actions/Auth";
import axios from "axios";

const SettingsDropdwon = (props) => {
    const email = useSelector((state) => state.auth.user.email);
    const deleteDoc = async () => {
        try {
            await axios.delete("/api/documents/" + props.id);
            dispatch(loadUser());
        } catch (err) {
            console.log(err.response);
        }
    };

    const onSubmit = async (name) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const body = JSON.stringify({ name });
        try {
            await axios.put(`/api/documents/${props.id}`, body, config);
            dispatch(loadUser());
        } catch (error) {
            console.log("server error");
        }
    };
    const [modalOpen, setModalOpen] = React.useState(false);
    const [shareOpen, setShareOpen] = React.useState(false);
    const dispatch = useDispatch();
    return (
        <React.Fragment>
            <Dropdown icon="ellipsis vertical">
                <Dropdown.Menu>
                    {email === props.owner ? (
                        <Dropdown.Item text="Delete" onClick={deleteDoc} />
                    ) : null}
                    <Dropdown.Item
                        text="Rename"
                        onClick={() => setModalOpen(true)}
                    />
                    {email === props.owner ? (
                        <Dropdown.Item
                            text="Share"
                            onClick={() => setShareOpen(true)}
                        />
                    ) : null}
                    <RenameModal
                        open={modalOpen}
                        onClose={() => setModalOpen(false)}
                        onSubmit={onSubmit}
                    />
                    {shareOpen ? (
                        <ShareModal
                            id={props.id}
                            open={shareOpen}
                            onClose={() => setShareOpen(false)}
                        />
                    ) : null}
                </Dropdown.Menu>
            </Dropdown>
        </React.Fragment>
    );
};

export default SettingsDropdwon;
