import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';


function ConcertDetailsPage() {
    const dispatch = useDispatch();
    const history = useHistory();

    // this reducer will be mapped through in the return function
    const concerts = useSelector(store => store.concertDetailsReducer);
    console.log(concerts);

    const postConcert = () => {
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
            console.log('Event post successful');
            alert('Concert Saved!')
        }).catch((error) => {
            alert('Oh No! Could Not Save Event.');
        })
        history.push('/userconcerts');
    }

    return(
        <>
            <h3>Here's Some More Info On The Show!</h3>
            Event: <p>{concerts.displayName}</p>
            City: <p>{concerts.location.city}</p>
            Date: <p>{concerts.start.date}</p>
            Time: <p>{concerts.start.time}</p>
            Event Page: <p>{concerts.uri}</p>
            <button onClick={postConcert}>Save Event!</button>
        </>
    )
}

export default ConcertDetailsPage;