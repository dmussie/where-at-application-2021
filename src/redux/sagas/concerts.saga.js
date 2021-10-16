import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// concerts saga: will be fired on "FETCH_CONCERTS" actions
function* fetchConcerts() {
    try{
        const config = {
            headers: {'Content-Type': 'application/json'},
            withCredentials: true,
        };

        const response = yield axios.get('/api/concerts', config);
        console.log(response.data);

        yield put({ type: 'SET_CONCERTS', payload: response.data });
    } catch (error) {
        console.log('Concerts get request failed', error);
    }
}

function* concertsSaga() {
    yield takeLatest('FETCH_CONCERTS', fetchConcerts);
}

export default concertsSaga;