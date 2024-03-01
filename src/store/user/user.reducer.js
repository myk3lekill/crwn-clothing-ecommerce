import { USER_ACTION_TYPES } from "./user.types";

//Configure The User Reducer

const INITIAL_STATE = {
    currentUser: null
}

export const userReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;

    //Type Switch
    switch(type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                ...state, //Spread the state object
                currentUser: payload //Update currentUser with payload
            }
        default:
            return state;
    }
}