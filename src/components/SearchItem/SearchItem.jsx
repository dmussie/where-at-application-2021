import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

function SearchItem({concert}) {
    const dispatch = useDispatch();
    const history = useHistory();

    const viewConcertDetails = () => {
        console.log(concert);
        // dispatch FETCH_CONCERT_DETAILS
        // create ConcertDetails saga and reducer
        dispatch({type: 'FETCH_CONCERT_DETAILS', payload: concert})
        history.push('/concertdetails');
    }

    return (
        <>
            <p>{concert.displayName}</p>
            <button onClick={viewConcertDetails}>View Details</button>
        </>

    );
};

export default SearchItem;