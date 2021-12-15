import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import ReviewItem from '../ReviewItem/ReviewItem';

// this page handles rendering saved user data to the DOM as a table
function ConcertReviewPage() {
    const dispatch = useDispatch();

    const [openModal, setOpenModal] = useState(false);

    // this reducer contains concert data pulled from the database
    const rows = useSelector(store => store.savedConcertsReducer);
    console.log('user concerts from database', rows);
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
        {openModal ? <p></p> :
            <div className="top-of-table"><h3>Here Are Your Upcoming Shows!</h3></div>
        }
        {openModal ? <p></p> :
            <ReviewItem rows={rows} />
        }
        </>
        
    )
};

export default ConcertReviewPage;