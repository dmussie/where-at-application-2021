import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchConcertDetails() {
    try{
        const config = {
            headers: {'Content-Type': 'application/json'},
            withCredentials: true,
        };

        const response = yield axios.get('/api/concerts', config);
        console.log(response.data);

        yield put({ type: 'SET_CONCERT_DETAILS', payload: response.data });
    } catch (error) {
        console.log('Concerts get request failed', error);
    }
}

function* concertDetailsSaga() {
    yield takeLatest('FETCH_CONCERT_DETAILS', fetchConcertDetails);
}

export default concertDetailsSaga;