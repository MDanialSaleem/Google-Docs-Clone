import Actions from "./Actions";
import StyleConstants from "../EditorUtils/StyleConstants";

export default (state, action) => {
    switch(action.type){
        case Actions.SET_FONT:
            return {
                ...state,
                [StyleConstants.FONT]: action.data
            }
        default:
    }
}