import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';


function ConcertDetailsPage() {
    const dispatch = useDispatch();
    const history = useHistory();

    // this reducer will be mapped through in the return function
    const concerts = useSelector(store => store.concertDetailsReducer);
    console.log(concerts);

    return(
        <>
            <h3>Here's Some More Info On The Show!</h3>
            <p>{concerts.displayName}</p>
            <p>{concerts.location.city}</p>
            <p>{concerts.start.date}</p>
            <p>{concerts.start.time}</p>
            <p>{concerts.uri}</p>
            <button>Save Event!</button>
        </>
    )
}

export default ConcertDetailsPage;