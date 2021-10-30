import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import './ReviewItem.css';

function ReviewItem({userConcert}) {
    const dispatch = useDispatch();

    // this function handles the deletion of an event upon selecting the delete button
    const removeConcert = () => {
        dispatch({type: 'DELETE_CONCERT', payload: userConcert});
    };

    // the saved user concert data is rendered below and displayed as a table
    // events can be deleted with the delete button
    return(
        <>
        <tr>
            <td>{userConcert.displayName}</td>
            <td>{userConcert.city}</td>
            <td>{userConcert.time}</td>
            <td>
            <a id="tickets-link" href={userConcert.uri} target="_blank"> Get Tickets!</a>
            </td>
            <td>
                <Button 
                variant="contained" 
                color="secondary" 
                onClick={removeConcert}>
                    Delete
                </Button>
            </td>
        </tr>
        </>
    )
}

export default ReviewItem;