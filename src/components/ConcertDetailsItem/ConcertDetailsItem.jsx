import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

function ConcertDetailsItem({concert}) {
    const dispatch = useDispatch();
    const history = useHistory();

    // const function to post to database and navigate to saved concerts page

    return (
        <>
            <p>{concert.displayName}</p>
            <p>{concert.location.city}</p>
            <p>{concert.start.date}</p>
            <p>{concert.start.time}</p>
            <p>{concert.uri}</p>
            <button>Save Event!</button>
        </>
    )
}

export default ConcertDetailsItem;