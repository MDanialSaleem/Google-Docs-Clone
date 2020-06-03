import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "semantic-ui-react";
import { loadDocuments, updateCount } from "../Store/Actions/Document";

export default () => {
    const totalPages = useSelector((state) => state.document.count);
    const activePage = useSelector((state) => state.document.activePage);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(updateCount());
    }, []);

    const onChangeHandler = (event, data) =>
        dispatch(loadDocuments(data.activePage));
    return (
        <Pagination
            activePage={activePage}
            totalPages={totalPages}
            siblingRange={2}
            boundaryRange={0}
            nextItem={null}
            prevItem={null}
            ellipsisItem={null}
            onPageChange={onChangeHandler}
        />
    );
};
