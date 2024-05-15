import { Middleware } from "redux";
import { RootState } from "../store";

export const loggerMiddleware: Middleware<{}, RootState> = (store) => (next) => (action) => {
    if(!action.type) {
        return next(action);
    }

    console.log('type: ', action.type);
    console.log('payload: ', action.payload);
    console.log('current state: ', store.getState());

    next(action);//pass action to the subsequent middleware;

    console.log('next state: ', store.getState())
}