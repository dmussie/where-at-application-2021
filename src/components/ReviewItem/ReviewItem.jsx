import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';

function ReviewItem({userConcert}) {
    const dispatch = useDispatch();
    const history = useHistory();

    const removeConcert = () => {
        dispatch({type: 'DELETE_CONCERT', payload: userConcert});
    };

    // const editConcert = () => {
    //     dispatch({type: 'EDIT_CONCERT', payload: userConcert});
    // };
    return(
        <tr>
            <td>{userConcert.displayName}</td>
            <td>{userConcert.city}</td>
            <td>{userConcert.time}</td>
            <td>
            <a href={userConcert.uri} target="_blank"> Get Tickets!</a>
            </td>
            <td>
                <Button 
                variant="contained" 
                color="secondary" 
                onClick={removeConcert}>
                    Delete
                </Button>
            </td>
            {/* <td>
                <button onClick={editConcert}>Edit</button>
            </td> */}
        </tr>
    )
}

export default ReviewItem;