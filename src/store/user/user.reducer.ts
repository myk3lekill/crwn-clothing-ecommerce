import { AnyAction } from "redux-saga";
import { USER_ACTION_TYPES } from "./user.types";
import { signInFailed, signUpFailed, signOutFailed, signOutSuccess, signInSuccess } from "./user.action";
import { UserData, getCurrentUser, signOutUser } from "../../utils/firebase/firebase.utils";

//Define Type fo UserState
export type UserState = {
    readonly currentUser: UserData | null;
    readonly isLoading: boolean;
    readonly error: Error | null
}

//Configure The User Reducer
const INITIAL_STATE: UserState = {
    currentUser: null,
    isLoading: false,
    error: null
}

export const userReducer = (state = INITIAL_STATE, action: AnyAction) => {

    if(signInSuccess.match(action)) {
        return { ...state, currentUser: action.payload };
    };

    if(signOutSuccess.match(action)) {
        return { ...state, getCurrentUser: null}
    };

    if(signInFailed.match(action) || signUpFailed.match(action) || signOutFailed.match(action)) {
        return { ...state, error: action.payload}
    };

    return state;
}