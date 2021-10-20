import { json } from 'express';
import React, { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router';

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
// stringify in the return and just vibe
    return (
        //insert table here
        <>
        <h3>Here Are Your Upcoming Shows!</h3>
        {JSON.stringify(userConcertList)}
        <table>
            <tr>
                <th>Event</th>
                <th>City</th>
                <th>Time</th>
                <th>Event Page</th>
            </tr>
            {/* <tr>
                <td>{userConcertList.displayName}</td>
                <td>{userConcertList.city}</td>
                <td>{userConcertList.time}</td>
                <td>{userConcertList.uri}</td>
            </tr> */}
        </table>
        </>
    )
};

export default ConcertReviewPage;