import React, { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import ReviewItem from '../ReviewItem/ReviewItem';

// this page handles rendering saved user data to the DOM as a table
function ConcertReviewPage() {
    const dispatch = useDispatch();

    // this reducer contains concert data pulled from the database
    const userConcertList = useSelector(store => store.savedConcertsReducer);
    console.log('user concerts from database', userConcertList);
    // this action handles pulling this database table to this component
    const getConcerts = () => {
        dispatch({type: 'FETCH_SAVED_CONCERTS'});
    };
    // this useEffect allows us to initiate rendering the concert data after page load
    useEffect(() => {
        console.log('getConcerts activated');
        getConcerts();
    }, []);

    // rendering the saved concert data into a table is performed here
    // we're initiating the mapping of our reducer here
    // data is passed via props to the review item child component to complete the mapping process and thus complete the table
    return (
        <>
        <h3>Here Are Your Upcoming Shows!</h3>
        <table>
            
            <thead>
                <th>Event</th>
                <th>City</th>
                <th>Time</th>
                <th>Event Page</th>
            </thead>
            <tbody>
                {userConcertList.map((userConcert) => {
                    return(<ReviewItem key={userConcert.id} userConcert={userConcert}/>)
                })}
            </tbody>
            
            
            
        </table>
        </>
        
    )
};

export default ConcertReviewPage;