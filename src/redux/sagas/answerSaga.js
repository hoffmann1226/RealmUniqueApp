import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* submitResponse(action) {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    yield axios.post('/api/response/add',  action.payload, config);

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in

    // yield put({ type: '', payload: response.data });
  } catch (error) {
    console.log('User get request failed', error);
  }
}


function* gtSection(action) {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get(`/api/section/${action.payload.sectionId}`, config);

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in

    yield put({ type: 'SET_SECTION', payload: response.data });
  } catch (error) {
    console.log('User get request failed', error);

  }
}

function* responseSaga() {
  yield takeLatest('SUBMIT_SECTION', submitResponse);
  yield takeLatest('FETCH_ALL_SECTIONS', getAllSections);
  yield takeLatest('FETCH_SECTION', getSection);
}

export default responseSaga;
