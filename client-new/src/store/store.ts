import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import initialState from "../reducers/initial-state";

// Import list app reducers

const appReducer = combineReducers({
});

export type AppState = ReturnType<typeof appReducer>;

function configureStore(state: any) {
  const middlewares = [thunkMiddleware];
  const middleWareEnhancer = applyMiddleware(...middlewares);

  const _store = createStore(
    appReducer,
    state,
    composeWithDevTools(middleWareEnhancer)
  );

  return _store;
}

const store = configureStore(initialState);
export default store;