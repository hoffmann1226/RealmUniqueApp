import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getAllRealms() {
  try {
    const response = yield axios.get('/api/realm/all');
    yield put({ type: 'SET_ALL_REALMS', payload: response.data });
    console.log('test console:', response.data);
  } catch (error) {
    console.log('Error with GET:', error);
  }
}

function* getRealm(action) {
  try {

    const response = yield axios.get(`/api/realm/get-realm/${action.payload.realmId}`);

    yield put({ type: 'SET_REALM', payload: response.data });
  } catch (error) {
    console.log('User get request failed', error);
  }
}

function* submitNewRealm(action){
      try{
        yield axios.post('/api/realm/add-new-realm', action.payload);
      }catch (error){
      console.log('error with post request', error);
    }
  }

function* realmSaga() {

  yield takeLatest('FETCH_REALM', getRealm);
  yield takeLatest("FETCH_ALL_REALMS", getAllRealms);
  yield takeLatest("POST_NEW_REALM", submitNewRealm);

}

export default realmSaga;
