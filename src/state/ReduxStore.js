import { createStore, combineReducers, applyMiddleware } from 'redux';
import { reducers } from './ducks';
import createSagaMiddleware from 'redux-saga';
import { default as rootSaga } from './middleware/RootSaga';
import { connectRouter } from 'connected-react-router';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
export var dispatch;
export var getState;

export const history = createBrowserHistory();

export default function configureStore(initialState) {
  const rootReducer = (history) =>
    combineReducers({
      router: connectRouter(history),
      ...reducers,
    });

  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    rootReducer(history),
    applyMiddleware(routerMiddleware(history), sagaMiddleware)
  );
  sagaMiddleware.run(rootSaga);
  dispatch = store.dispatch;
  getState = store.getState();
  return store;
}
