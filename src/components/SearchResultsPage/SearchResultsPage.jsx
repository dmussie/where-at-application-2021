import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import SearchItem from '../SearchItem/SearchItem';

//concert search data will be sent here to be rendered on the DOM
//this will be presented as a "results list" for a user to select
//shows they want to attend 
function SearchResultsPage() {
    const dispatch = useDispatch();
    const history = useHistory();

    // this reducer will be mapped through in the return function
    const concerts = useSelector(store => store.concertsReducer);
    console.log(concerts);

    return(
        <div>
            <h3>Here Are Some Shows You Might Like!</h3>
            {concerts.map((concert) => {
                    return(<SearchItem key={concert.id} concert={concert} />)
            })} 
        </div>

    );
}

export default SearchResultsPage;