import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* fetchConcertDetails(action) {
    try{
        const config = {
            headers: {'Content-Type': 'application/json'},
            withCredentials: true,
        };
        console.log('action.payload is:', action.payload);
        const concertId = action.payload.id;
        console.log(concertId);
        const response = yield axios.get(`/api/concerts/${concertId}`, config);
        console.log(response.data);

        yield put({ type: 'SET_CONCERT_DETAILS', payload: response.data });
    } catch (error) {
        console.log('Concerts get request failed', error);
    }
}

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

function* concertsSaga() {
    yield takeEvery('FETCH_CONCERT_DETAILS', fetchConcertDetails);
    yield takeEvery('DELETE_CONCERT', deleteConcert);
}

export default concertsSaga;