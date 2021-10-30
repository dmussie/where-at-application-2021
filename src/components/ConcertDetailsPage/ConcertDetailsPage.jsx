import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Button from '@material-ui/core/Button';

function ConcertDetailsPage() {
    const dispatch = useDispatch();
    const history = useHistory();

    // this reducer will be mapped through in the return function
    // this contains relevant concert details which will be rendered on the DOM
    const concerts = useSelector(store => store.concertDetailsReducer);
    console.log(concerts);

    const postConcert = () => {
       // this post route will post an event to the database if the user initiates a save action
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
            // if the post is successful the user is navigated to the user concerts page
            history.push('/userconcerts');
        }).catch((error) => {
            alert('Oh No! Could Not Save Event.');
        })
    };

    const backToSearchResults = () => {
        history.push('/searchresults')
    };

    // Concert data from the reducer is rendered below to be seen on the DOM 
    return(
        <>
            <h3>Here's Some More Info On The Show!</h3>
            Event: <p>{concerts.displayName}</p>
            City: <p>{concerts.location.city}</p>
            Time: <p>{concerts.start.time}</p>
            <p>
                <a href={concerts.uri} target="_blank"> Event Page</a>
            </p>
            <Button 
            variant="contained" 
            color="primary" 
            onClick={postConcert}>
                Save Event!
            </Button>
            <Button 
            variant="contained" 
            color="secondary" 
            onClick={backToSearchResults}>
                Back
            </Button>
        </>
    )
}

export default ConcertDetailsPage;