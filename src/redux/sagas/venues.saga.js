import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchVenues() {
    try{
        const config = {
            headers: {'Content-Type': 'application/json'},
            withCredentials: true,
        };

        const response = yield axios.get('/api/concerts', config);
        console.log(response.data);

        yield put({ type: 'SET_VENUES', payload: response.data });
    } catch (error) {
        console.log('Concerts get request failed', error);
    }
}

function* venuesSaga() {
    yield takeLatest('FETCH_VENUES', fetchVenues);
}

export default venuesSaga;