import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';

function ConcertSearchPage() {
    // start with venue and dates search
    // venue and dates search will navigate us to search results page
    // events will be presented in the following search results page
    // which will include name of artist, date and time of show at venue

    const dispatch = useDispatch();
    const history = useHistory();

    // input useStates 
    const [venueSearch, setVenueSearch] = useState('');
    const [dateOneSearch, setDateOneSearch] = useState('');
    const [dateTwoSearch, setDateTwoSearch] = useState('');
    const [results, setResults] = useState([]);

    //TODO saga with the get? 
    const handleSubmit = (event) => {
        console.log(event);
        console.log(venueSearch);
        event.preventDefault();
        axios.get(`/api/concerts/${venueSearch}`)
        .then(response => {
            console.log('response is:', response.data);
            console.log('search results are:', results);
            setResults(response.data);
        }).catch(error => {
            console.log('error in handleSubmit', error);
        })
    }

    // for loop/switch statements for venue results
    const findAVenue = (event) => {
        let venueId = [];
        console.log(event);
        console.log(venueSearch);
        event.preventDefault();
        axios.get(`/api/concerts/venue/${venueSearch}`)
        
        .then(response => {
            console.log('response is:', response.data);
            console.log('inside response:', response.data.resultsPage.results.venue);

            const venueArray = response.data.resultsPage.results.venue;
            for(let i in venueArray) {
                if(venueArray[i].city.displayName === 'Minneapolis') {
                   venueId.push(venueArray[i].id);
                     
                }
                console.log('minneapolis venue id', venueId); 
            }
            const numberOfVenues = venueId.length;
            let numberOfVenueResults = 0;
            console.log(venueId);
            for (let i of venueId) {
                axios.get(`/api/concerts/${i}`)
                .then(response => {
                    numberOfVenueResults += 1;
                    console.log('inside venueId loop', i, response);
                    console.log('event data', response.data.resultsPage.results.event);
                    const eventPayload = response.data.resultsPage.results.event;
                    dispatch({type: 'FETCH_CONCERTS', payload: eventPayload})
                    if (numberOfVenues === numberOfVenueResults) {
                        history.push('/searchresults');
                    }
                }).catch(error => {
                    console.log('error in venueId loop:', error);
                })
                
            }
            
        }).catch(error => {
            console.log('error in handleSubmit', error);
        })
    }

    return (
        <div>
            <h2>Find Your Next Show!</h2>
            <form onSubmit={handleSubmit}>
                Venue:<input placeholder="Venue" type="text" value={venueSearch} 
                onChange={(event) => setVenueSearch(event.target.value)}/>
                Date One:<input placeholder="YYYY-MM-DD" type="text" value={dateOneSearch} 
                onChange={(event) => setDateOneSearch(event.target.value)}/>
                Date Two:<input placeholder="YYYY-MM-DD" type="text" value={dateTwoSearch} 
                onChange={(event) => setDateTwoSearch(event.target.value)}/>
                <Button 
                variant="contained" 
                color="secondary" 
                onClick={findAVenue}>
                    Find A Venue!
                </Button>
            </form>
        </div>
    
        //map through search results
    );

};

export default ConcertSearchPage;