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
    const concertsReducer = useSelector(store => store.concertsReducer);
    console.log(concertsReducer);
    const getConcerts = () => {
        dispatch({type: 'FETCH_CONCERTS'});
    }

    useEffect(() => {
        console.log('Results page useEffect successful');
        // dispatch an action to request concertsReducer data from API
        getConcerts();
    }, []);

    return(
        <div>
            <h3>Here Are Some Shows You Might Like!</h3>
            <p>
                {concertsReducer.map((concert) => {
                    <SearchItem key={concert.id} concert={concert} />
                })}
            </p>
        </div>

    );
}

export default SearchResultsPage;