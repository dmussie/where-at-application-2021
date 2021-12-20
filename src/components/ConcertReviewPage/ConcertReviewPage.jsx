import {  
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import ReviewItem from '../ReviewItem/ReviewItem';

// this page handles rendering saved user data to the DOM as a table
function ConcertReviewPage() {
    const dispatch = useDispatch();

    // this reducer contains concert data pulled from the database
    const userConcertsList = useSelector(store => store.savedConcertsReducer);
    
    // this action handles pulling this database table to this component
    const getConcerts = () => {
        dispatch({type: 'FETCH_SAVED_CONCERTS'});
    };
    // this useEffect allows us to initiate rendering the concert data after page load
    useEffect(() => {
        getConcerts();
    }, []);

    const showConcerts = userConcertsList ? true: false;

    // rendering the saved concert data into a table is performed here
    // we're initiating the mapping of our reducer here
    // data is passed via props to the review item child component to complete the mapping process and thus complete the table
    return (
        <>
        <div className="user-concertlist-container">
            <h2>Your Upcoming Shows!</h2>
            {showConcerts &&
            (<TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Event</TableCell>
                            <TableCell>City</TableCell>
                            <TableCell>Time</TableCell>
                            <TableCell>Event Page</TableCell>
                            <TableCell>Delete Concert</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userConcertsList.map((userConcerts) => {
                            return(<ReviewItem key={userConcerts.id} userConcerts={userConcerts} />)
                        })}
                    </TableBody>
                </Table>
            </TableContainer>)
            }
        </div>
        </>
    )
};

export default ConcertReviewPage;