import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

// this page handles all the sagas of the application

// this function handles receiving all neccessary concert data from the songkick api
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
        // api data is then passed to a reducer, to be rendered on the DOM
        yield put({ type: 'SET_CONCERT_DETAILS', payload: response.data });
    } catch (error) {
        console.log('Concerts get request failed', error);
    }
}

// this function handles gathering saved user concert data back from the database
function* fetchSavedConcerts() {
    try{
        const config = {
            headers: {'Content-Type': 'application/json'},
            withCredentials: true,
        };

        const response = yield axios.get('/api/concerts', config);
        console.log(response.data);
        // this database information is then added to another reducer
        // from here this information is rendered to the DOM as a table
        yield put({ type: 'SET_SAVED_CONCERTS', payload: response.data });
    } catch (error) {
        console.log('Concerts get request failed', error);
    }
}

// this function handles the deletion of a saved concert from the DOM and database by extention
function* deleteConcert(action) {
    try{
        const config = {
            headers: {'Content-Type': 'application/json'},
            withCredentials: true,
        };
        console.log('Inside sagas deleteConcert');
        console.log('action.payload.id', action.payload.id);
        const concertId = action.payload.id; 
        // we select for a specific concert by its id
        yield axios.delete(`/api/concerts/${concertId}`, config);
        // this action references a reducer that temporarily holds our saved data
        // we are deleting from this reducer as well
        // the reducer is the first point of contact for the deletion route
        const actionForFetch = {type: 'FETCH_SAVED_CONCERTS'}

        yield put(actionForFetch);
    } catch (error) {
        console.log('Concerts delete request failed', error);
    }
}

// all of our functions are set here in the concertsSaga and called in the root saga
function* concertsSaga() {
    yield takeEvery('FETCH_CONCERT_DETAILS', fetchConcertDetails);
    yield takeEvery('FETCH_SAVED_CONCERTS', fetchSavedConcerts);
    yield takeEvery('DELETE_CONCERT', deleteConcert);
}

export default concertsSaga;