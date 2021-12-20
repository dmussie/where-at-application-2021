import { useDispatch } from 'react-redux';
import { 
    Button, 
    TableRow,
    TableCell,    
    Link,
} from '@mui/material';
import './ReviewItem.css';

function ReviewItem({userConcerts}) {
    const dispatch = useDispatch();

    // this function handles the deletion of an event upon selecting the delete button
    const removeConcert = () => {
        dispatch({type: 'DELETE_CONCERT', payload: userConcerts});
    };

    // the saved user concert data is rendered below and displayed as a table
    // events can be deleted with the delete button
    return(
        <>
        <TableRow>
            <TableCell>{userConcerts.displayName}</TableCell>
            <TableCell>{userConcerts.city}</TableCell>
            <TableCell>{userConcerts.time}</TableCell>
            <TableCell>
            <Link id="tickets-link" href={userConcerts.uri} target="_blank"> Get Tickets!</Link>
            </TableCell>
            <TableCell>
                <Button 
                variant="contained" 
                color="secondary" 
                onClick={removeConcert}>
                    Delete
                </Button>
            </TableCell>
        </TableRow>
        </>
    )
}

export default ReviewItem;