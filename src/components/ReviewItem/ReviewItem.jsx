import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

function ReviewItem({userConcert}) {

    return(
        <tr>
            <td>{userConcert.displayName}</td>
            <td>{userConcert.city}</td>
            <td>{userConcert.time}</td>
            <td>
            <a href={userConcert.uri} target="_blank"> Get Tickets!</a>
            </td>
        </tr>
    )
}

export default ReviewItem;