import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';


function ConcertDetailsPage() {
    const dispatch = useDispatch();
    const history = useHistory();

    // this reducer will be mapped through in the return function
    const concerts = useSelector(store => store.concertDetailsReducer);
    console.log(concerts);

    const postConcert = () => {
        // saga incorporated here to solve refresh issue on userconcerts
        axios({
            method: 'POST',
            url: '/api/concerts',
            data: {
                displayName: concerts.displayName,
                city: concerts.location.city,
                time: concerts.start.time,
                uri: concerts.uri
            }
        }).then((response) => {
            console.log('Event post successful', response);
            history.push('/userconcerts');
        }).catch((error) => {
            alert('Oh No! Could Not Save Event.');
        })
    }

    return(
        <>
            <h3>Here's Some More Info On The Show!</h3>
            Event: <p>{concerts.displayName}</p>
            City: <p>{concerts.location.city}</p>
            Time: <p>{concerts.start.time}</p>
            <p>
                <a href={concerts.uri} target="_blank"> Event Page</a>
            </p>
            <button onClick={postConcert}>Save Event!</button>
        </>
    )
}

export default ConcertDetailsPage;