import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import appReducer from './appReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createWrapper } from 'next-redux-wrapper';

const reducers = combineReducers({
    app: appReducer,
});

export type RootReducerType = typeof reducers;

export const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunkMiddleware)));

const makeStore = () => store;

export const wrapper = createWrapper(makeStore, { debug: true });
