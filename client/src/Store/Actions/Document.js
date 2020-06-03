import axios from "axios";
import { LOAD_DOCUMENTS, UPDATE_COUNT } from "./Types";

// LOAD Documents
export const loadDocuments = (page) => async (dispatch) => {
    try {
        const res = await axios.get(`/api/documents/all/${page}`);
        dispatch({
            type: LOAD_DOCUMENTS,
            payload: {
                documents: res.data,
                activePage: page,
            },
        });
    } catch (err) {
        console.log(err);
    }
};

export const updateCount = () => async (dispatch, getState) => {
    try {
        const res = await axios.get("/api/documents/count");
        const newPageSize = Math.ceil(res.data.count / 10);
        //WE SHOULD HAVE THIS 10 IN THE COMMON CONSTANT FILE CURRENTLY IT IS ONLY IN SERVESIDE CONSTANTS.

        dispatch({
            type: UPDATE_COUNT,
            payload: {
                count: newPageSize,
            },
        });

        const activePage = getState().document.activePage;
        //used to handle deletion case.
        if (activePage !== 0 && activePage > newPageSize) {
            dispatch(loadDocuments(newPageSize));
        } else {
            dispatch(loadDocuments(activePage));
        }
    } catch (err) {
        console.log(err);
    }
};
