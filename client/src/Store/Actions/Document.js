import axios from "axios";
import { LOAD_DOCUMENTS } from "./Types";

// LOAD Documents
export const loadDocuments = () => async (dispatch) => {
    try {
        const res = await axios.get("/api/documents/");
        dispatch({
            type: LOAD_DOCUMENTS,
            payload: {
                owndocs: res.data.owndocs,
                colabdocs: res.data.colabdocs,
            },
        });
    } catch (err) {
        console.log(err);
    }
};
