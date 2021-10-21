import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* deleteConcert(action) {
    try{
        const config = {
            headers: {'Content-Type': 'application/json'},
            withCredentials: true,
        };
        console.log('Inside sagas deleteConcert');
        console.log('action.payload.id', action.payload.id);
        const concertId = action.payload.id; 
        yield axios.delete(`/api/concerts/${concertId}`, config);
        const actionForFetch = {type: 'FETCH_SAVED_CONCERTS'}

        yield put(actionForFetch);
    } catch (error) {
        console.log('Concerts delete request failed', error);
    }
}

function* deleteConcertSaga() {
    yield takeEvery('DELETE_CONCERT', deleteConcert);
}

export default deleteConcertSaga;