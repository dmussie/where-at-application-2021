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

function* concertDetailsSaga() {
    yield takeEvery('FETCH_CONCERT_DETAILS', fetchConcertDetails);
}

export default concertDetailsSaga;