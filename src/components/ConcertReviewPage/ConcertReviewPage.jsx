import React, { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router';
import ReviewItem from '../ReviewItem/ReviewItem';

function ConcertReviewPage() {
    const dispatch = useDispatch();
    const history = useHistory();

    const userConcertList = useSelector(store => store.savedConcertsReducer);
    console.log('user concerts from database', userConcertList);
    const getConcerts = () => {
        dispatch({type: 'FETCH_SAVED_CONCERTS'});
    };

    useEffect(() => {
        console.log('getConcerts activated');
        getConcerts();
    }, []);

    return (
        //insert table here
        <>
        <h3>Here Are Your Upcoming Shows!</h3>
        <table>
            
            <tr>
                <th>Event</th>
                <th>City</th>
                <th>Time</th>
                <th>Event Page</th>
            </tr>
            <tbody>
                {/* map here */}
                {userConcertList.map((userConcert) => {
                    return(<ReviewItem key={userConcert.id} userConcert={userConcert}/>)
                })}
            </tbody>
            
            
            
        </table>
        </>
        
    )
};

export default ConcertReviewPage;