import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ConcertDetailsItem from '../ConcertDetailsItem/ConcertDetailsItem';

function ConcertDetailsPage() {
    const dispatch = useDispatch();
    const history = useHistory();

    // this reducer will be mapped through in the return function
    const concerts = useSelector(store => store.concertsReducer);
    console.log(concerts);

    return(
        <>
            <h3>Here's Some More Info On The Show!</h3>
            <>
                {concerts.map((concert) => {
                    return(<ConcertDetailsItem key={concert.id} concert={concert} />)
                })}
            </>
            {/* <p>{concerts.displayName}</p> */}
            {/* <p>{concerts.location.city}</p> */}
            {/* <p>{concerts.start.date}</p>
            <p>{concerts.start.time}</p>
            <p>{concerts.venue.metroArea.uri}</p> */}
        </>
    )
}

export default ConcertDetailsPage;