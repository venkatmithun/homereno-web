import { all } from 'redux-saga/effects';
import { userSagas } from '../ducks/user';

export function* watchSaga() {
  //  console.log('Sagas middle layer started!................');
}

export default function* rootSaga() {
  yield all([watchSaga(), userSagas.watchUser()]);
}
