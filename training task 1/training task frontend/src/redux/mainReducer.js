import { combineReducers } from "redux";
import userReducer from "./reducer";

const mainReducer = combineReducers({
    user: userReducer
})

export default mainReducer;