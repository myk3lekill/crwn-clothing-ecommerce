import { createContext, useEffect, useReducer, useState } from 'react';
import { createUserDocumentFromAuth, onAuthStateChangedListener, signOutUser } from '../utils/firebase/firebase.utils';
import { createAction } from '../utils/firebase/reducer/reducer.utils';

export const UserContext = createContext({ 
    currentUser: null,
    setCurrentUser: () => null,
});

//Configure The Reducer
export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: 'SET_CURRENT_USER'
}

const INITIAL_STATE = {
    currentUser: null
}

const userReducer = (state, action) => {
    const { type, payload } = action;
    //Type Switch
    switch(type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                ...state, //Spread the state object
                currentUser: payload //Update currentUser with payload
            }
        default:
            throw new Error(`Unhandled type ${type} in userReducer`)
    }
}

export const UserProvider = ({ children }) => {
    //Use the Reducer
    const [ state, dispatch] = useReducer(userReducer, INITIAL_STATE)
    const { currentUser } = state
    console.log(currentUser)
    
    const setCurrentUser = (user) => {
        dispatch(createAction( USER_ACTION_TYPES.SET_CURRENT_USER, user ))
    }

    const value = { currentUser, setCurrentUser };
    //signOutUser()
    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            if (user) {
                createUserDocumentFromAuth(user)
            }
            setCurrentUser(user)
        })
        return unsubscribe
    })
    return <UserContext.Provider value={value}> { children } </UserContext.Provider>
};

<UserProvider>
    <app />
</UserProvider>