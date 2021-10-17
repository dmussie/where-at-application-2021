import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

function SearchItem({concert}) {
    const dispatch = useDispatch();
    const history = useHistory();

    const viewConcertDetails = () => {
        console.log(concert.data.resultsPage.results.event);
        const concertPayload = concert.data.resultsPage.results.event;
        dispatch({type: 'FETCH_CONCERT_DETAILS', payload: concertPayload})
        history.push('/concertdetails');
    }

    return (
        <>
            {concert.displayName}
            <button onClick={viewConcertDetails}>View Details</button>
        </>

    );
};

export default SearchItem;