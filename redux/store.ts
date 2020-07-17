import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createWrapper, MakeStore, Context } from 'next-redux-wrapper';
import appReducer from './appReducer';

const reducers = combineReducers({
    app: appReducer,
});

export type RootReducerType = ReturnType<typeof reducers>;

const makeStore: MakeStore<RootReducerType> = (ctx: Context) =>
    createStore(reducers, undefined, composeWithDevTools(applyMiddleware(thunkMiddleware)));

export const wrapper = createWrapper<RootReducerType>(makeStore, { debug: true });
