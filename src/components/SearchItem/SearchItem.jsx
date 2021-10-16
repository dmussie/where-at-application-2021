import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

function SearchItem({concert}) {
    const dispatch = useDispatch();
    const history = useHistory();

    const viewConcertDetails = () => {
        console.log(concert);
        dispatch({type: 'FETCH_CONCERT_DETAILS', payload: concert})
        history.push('/concertdetails');
    }

    return (
        <p>
            <span>{concert}</span>
            <button onClick={viewConcertDetails}>View Details</button>
        </p>

    );
};

export default SearchItem;