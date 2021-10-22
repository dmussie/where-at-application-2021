import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';

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
        <div>
            <p>{concert.displayName}</p>
            <Button 
            variant="text"
            color="primary"  
            onClick={viewConcertDetails}>
                View Details
            </Button>
        </div>
    );
};

export default SearchItem;