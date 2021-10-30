import {  useSelector } from 'react-redux';
import React from 'react';
import SearchItem from '../SearchItem/SearchItem';
import './SearchResultsPage.css';

//concert search data will be sent here to be rendered on the DOM
//this will be presented as a "results list" for a user to select
//shows they want to attend 
function SearchResultsPage() {

    // this reducer will be mapped through in the return function
    const concerts = useSelector(store => store.concertsReducer);
    console.log(concerts);
    
    // returned data will be mapped through and displayed
    // the mapping process is initiated in this component 
    // but the SearchItem component will handle sending down data via props to complete the action 
    return(
        <div className="results">
            <h3>Here Are Some Shows You Might Like!</h3>
            <img src="/images/powered-by-songkick-pink.png" alt="Songkick logo" />
            {concerts.map((concert) => {
                    return(<SearchItem key={concert.id} concert={concert} />)
            })} 
        </div>

    );
}

export default SearchResultsPage;