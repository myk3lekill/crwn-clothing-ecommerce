import { Middleware } from "redux";
import { RootState } from "../store";

export const loggerMiddleware: Middleware<{}, RootState> = (store) => (next) => (action) => {
    if(!action) {
        return next(action);
    }

    console.log('type: ', action);
    console.log('payload: ', action);
    console.log('current state: ', store.getState());

    next(action);//pass action to the subsequent middleware;

    console.log('next state: ', store.getState())
}