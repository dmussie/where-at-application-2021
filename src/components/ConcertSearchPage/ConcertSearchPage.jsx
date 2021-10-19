import axios from 'axios';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

function ConcertSearchPage() {
    // start with venue and dates search
    // venue and dates search will navigate us to search results page
    // events will be presented in the following search results page
    // which will include name of artist, date and time of show at venue

    const dispatch = useDispatch();
    const history = useHistory();

    

    //console.log(venues);
    
    const [venueSearch, setVenueSearch] = useState('');
    const [dateOneSearch, setDateOneSearch] = useState('');
    const [dateTwoSearch, setDateTwoSearch] = useState('');
    const [results, setResults] = useState([]);

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
            
            //dispatch({type: 'SET_CONCERTS', payload: results})
            
            //for loop here, res.send results (switch statement for mulitple cities)
            //req.user.city!!!! for condition
            const venueArray = response.data.resultsPage.results.venue;
            for(let i in venueArray) {
                if(venueArray[i].city.displayName === 'Minneapolis') {
                   venueId.push(venueArray[i].id);
                     
                }
                console.log('minneapolis venue id', venueId); 
            }
            console.log(venueId);
            for (let i of venueId) {
                axios.get(`/api/concerts/${i}`)
                .then(response => {
                    console.log('inside venueId loop', i, response);
                    console.log('event data', response.data.resultsPage.results.event);
                    const eventPayload = response.data.resultsPage.results.event;
                    dispatch({type: 'FETCH_CONCERTS', payload: eventPayload})
                    history.push('/searchresults');
                }).catch(error => {
                    console.log('error in venueId loop:', error);
                })
                
            }
            
        }).catch(error => {
            console.log('error in handleSubmit', error);
        })
    }

    // const handleVenueSubmit = (event) => {
    //     console.log(event);
    //     console.log(venueSearch);
    //     event.preventDefault();
    //     axios.get(`/api/concerts/${venueSearch}`)
    //     .then(response => {
    //         console.log('response is:', response.data);
    //         setResults(response.data);
    //     }).catch(error => {
    //         console.log('error in handleVenueSubmit', error);
    //     })
    // }

    const defaultSearch = {venue: '', dateOne: '', dateTwo: ''}
    //Initial state is an object, with venue [dropdown], dateOne, dateTwo
    let [newSearch, setSearch] = useState(defaultSearch);

    const handleNewVenue = (event) => {
        console.log('event occurred');
        setSearch({...newSearch, venue: event.target.value});
    };

    

    

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
                <button onClick={findAVenue}>Find A Venue!</button>
            </form>
        </div>
    
        //map through search results
    );

};

export default ConcertSearchPage;