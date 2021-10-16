import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

function ConcertSearchPage() {
    // start with venue and dates search
    // venue and dates search will navigate us to search results page
    // events will be presented in the following search results page
    // which will include name of artist, date and time of show at venue

    const dispatch = useDispatch();
    const history = useHistory();
    
    const [venueSearch, setVenueSearch] = useState('');
    const [dateOneSearch, setDateOneSearch] = useState('');
    const [dateTwoSearch, setDateTwoSearch] = useState('');
    const [results, setResults] = useState({});

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
            //history.push('/searchresults');
            //for loop here, res.send results (switch statement for mulitple cities)
            //req.user.city!!!! for condition
            const venueArray = response.data.resultsPage.results.venue;
            for(let i in venueArray) {
                if(venueArray[i].city.displayName === 'Minneapolis') {
                   //() => setResults({...results, i: response.data.resultsPage.results.venue.id});
                   venueId.push(venueArray[i].id);
                     
                }
                console.log('minneapolis venue id', venueId); 
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

    // const handleLocationSubmit = (event) => {
    //     console.log(event);
    //     console.log(locationSearch);
    //     event.preventDefault();
    //     axios.get(`/api/concerts/${locationSearch}`)
    //     .then(response => {
    //         console.log('response is:', response.data);
    //         setResults(response.data);
    //     }).catch(error => {
    //         console.log('error in handleLocationSubmit', error);
    //     })
    // }

    // const handleDateOneSubmit = (event) => {
    //     console.log(event);
    //     console.log(dateOneSearch);
    //     event.preventDefault();
    //     axios.get(`/api/concerts/${dateOneSearch}`)
    //     .then(response => {
    //         console.log('response is:', response.data);
    //         setResults(response.data);
    //     }).catch(error => {
    //         console.log('error in handleDateOneSubmit', error);
    //     })
    // }

    // const handleDateTwoSubmit = (event) => {
    //     console.log(event);
    //     console.log(dateTwoSearch);
    //     event.preventDefault();
    //     axios.get(`/api/concerts/${dateTwoSearch}`)
    //     .then(response => {
    //         console.log('response is:', response.data);
    //         setResults(response.data);
    //     }).catch(error => {
    //         console.log('error in handleDateTwoSubmit', error);
    //     })
    // }

    return (
        <div>
            <h2>Find Your Next Show!</h2>
            Venue:<input placeholder="Venue" type="text" value={venueSearch} 
                onChange={(event) => setVenueSearch(event.target.value)}/>
                <button onClick={findAVenue}>Find A Venue!</button>
            <form onSubmit={handleSubmit}>
                Venue Dropdown: <select name="venues" id="venues" value={} onChange={}>
                    </select>
                Date One:<input placeholder="YYYY-MM-DD" type="text" value={dateOneSearch} 
                onChange={(event) => setDateOneSearch(event.target.value)}/>
                Date Two:<input placeholder="YYYY-MM-DD" type="text" value={dateTwoSearch} 
                onChange={(event) => setDateTwoSearch(event.target.value)}/>
                {/* <input placeholder="Venue" type="text" value={venueSearch} 
                onChange={(event) => setVenueSearch(event.target.value)}/>
                <input placeholder="Location" type="text" value={locationSearch} 
                onChange={(event) => setLocationSearch(event.target.value)}/>
                
                 */}
                <input type="Submit" value="Submit New Search"/>
            </form>
            <ul>
                {/* {results.map((venue) => (
                    <li key={venue.id}>{venue.id}{venue.displayName}{venue.city.displayName}</li>
                ))} */}
            </ul>
            {JSON.stringify(results)}
        </div>
    
        //map through search results
    );

};

export default ConcertSearchPage;