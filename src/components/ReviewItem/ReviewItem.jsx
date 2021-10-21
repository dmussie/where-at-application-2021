import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

function ReviewItem({userConcert}) {
    const dispatch = useDispatch();
    const history = useHistory();

    const removeConcert = () => {
        dispatch({type: 'DELETE_CONCERT', payload: userConcert});
    }
    return(
        <tr>
            <td>{userConcert.displayName}</td>
            <td>{userConcert.city}</td>
            <td>{userConcert.time}</td>
            <td>
            <a href={userConcert.uri} target="_blank"> Get Tickets!</a>
            </td>
            <td>
                <button onClick={removeConcert}>Delete Concert</button>
            </td>
        </tr>
    )
}

export default ReviewItem;