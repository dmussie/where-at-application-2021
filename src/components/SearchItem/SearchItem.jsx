import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import './SearchItem.css';

// in this component, mapped data is passed down via props
function SearchItem({concert}) {
    const dispatch = useDispatch();
    const history = useHistory();

    // this function handles initiating the action of collecting neccessary concert data from the API
    // the user is then navigated to the details page
    const viewConcertDetails = () => {
        console.log(concert);
        dispatch({type: 'FETCH_CONCERT_DETAILS', payload: concert})
        history.push('/concertdetails');
    }

    // concert details are diplayed to the DOM here
    return (
        <div class="results-item">
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