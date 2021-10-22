import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* editConcert(action) {
    try{
        const config = {
            headers: {'Content-Type': 'application/json'},
            withCredentials: true,
        };
        console.log('Inside sagas editConcert');
        console.log('action.payload.id', action.payload.id);
        const concertId = action.payload.id; 
        yield axios.put(`/api/concerts/${concertId}`, config);
        const actionForFetch = {type: 'FETCH_SAVED_CONCERTS'}

        yield put(actionForFetch);
    } catch (error) {
        console.log('Concerts put request failed', error);
    } 
}

function* editConcertSaga() {
    yield takeEvery('EDIT_CONCERT', editConcert);
}

export default editConcertSaga;