import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import './ConcertSearchPage.css';

function ConcertSearchPage() {
    // start with venue and dates search
    // venue and dates search will navigate us to search results page
    // events will be presented in the following search results page
    // which will include name of artist, date and time of show at venue

    const dispatch = useDispatch();
    const history = useHistory();

    // input useStates 
    const [showSearch, setShowSearch] = useState('');
    const [dateOneSearch, setDateOneSearch] = useState('');
    const [dateTwoSearch, setDateTwoSearch] = useState('');
    const [results, setResults] = useState([]);

    //TODO saga with the get? 
    const handleSubmit = (event) => {
        console.log(event);
        console.log(showSearch);
        event.preventDefault();
        axios.get(`/api/concerts/${showSearch}`)
        .then(response => {
            console.log('response is:', response.data);
            console.log('search results are:', results);
            setResults(response.data);
        }).catch(error => {
            console.log('error in handleSubmit', error);
        })
    }

    // for loop/switch statements for venue results
    const findAShow = (event) => {
        let venueId = [];
        console.log(event);
        console.log(showSearch);
        event.preventDefault();
        axios.get(`/api/concerts/venue/${showSearch}`)
        // within this .then, API venue query inputs are acknowledged
        // this action yields all relevant venue id's available for a searched venue
        .then(response => {
            console.log('response is:', response.data);
            console.log('inside response:', response.data.resultsPage.results.venue);
            // We loop through all venue id's and push them within the venueArray variable
            const venueArray = response.data.resultsPage.results.venue;
            for(let i in venueArray) {
                if(venueArray[i].city.displayName === 'Minneapolis') {
                   venueId.push(venueArray[i].id);
                     
                }
                console.log('minneapolis venue id', venueId); 
            }

            // the length of the venue id array is saved as the numberOfVenues variable
            const numberOfVenues = venueId.length;
            // we keep track of number of results as we make a api request 
            let numberOfVenueResults = 0;
            console.log(venueId);

            // the following action is initiated when the search button is hit
            // we loop through each venue id within the venueId array
            // that venue id is incorporated within a second api request along with specified dates
            for (let i of venueId) {
                axios.get(`/api/concerts/${i}/${dateOneSearch}/${dateTwoSearch}`)
                .then(response => {
                    numberOfVenueResults += 1;
                    console.log('inside venueId loop', i, response);
                    console.log('event data', response.data.resultsPage.results.event);
                    const eventPayload = response.data.resultsPage.results.event;
                    dispatch({type: 'FETCH_CONCERTS', payload: eventPayload})
                    // after looping through the venueId array, 
                    // if the numberOfVenueResults equals the number of venues in the venue array
                    // we can navigate to the results page after hitting the search button
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
        // the search inputs are rendered within this return
        // each input contains a relevant placeholder
        // a value is set to each input's useState
        // on change, the value of each input is set to whatever venue name or date a user chooses
        // the click action initiates the search action
        <div class="search">
            <h2>Find Your Next Show!</h2>
            <form onSubmit={handleSubmit}>
                Venue:<input placeholder="Venue" type="text" value={showSearch} 
                onChange={(event) => setShowSearch(event.target.value)}/>
                Min Date:<input placeholder="YYYY-MM-DD" type="text" value={dateOneSearch} 
                onChange={(event) => setDateOneSearch(event.target.value)}/>
                Max Date:<input placeholder="YYYY-MM-DD" type="text" value={dateTwoSearch} 
                onChange={(event) => setDateTwoSearch(event.target.value)}/>
                <Button 
                variant="contained" 
                color="primary" 
                onClick={findAShow}>
                    Find A Show!
                </Button>
            </form>
        </div>
    );

};

export default ConcertSearchPage;