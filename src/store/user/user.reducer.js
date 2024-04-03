import { USER_ACTION_TYPES } from "./user.types";

//Configure The User Reducer

const INITIAL_STATE = {
    currentUser: null,
    isLoading: false,
    error: null
}

export const userReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;

    //Type Switch
    switch(type) {
        case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
            return {
                ...state, //Spread the state object
                currentUser: payload //Update currentUser with payload
            }
        case USER_ACTION_TYPES.SIGN_IN_FAILED:
            return {
                ...state,
                error: payload
            }
        default:
            return state;
    }
}