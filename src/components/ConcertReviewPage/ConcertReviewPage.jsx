import React, { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router';

function ConcertReviewRage() {
    const dispatch = useDispatch();
    const history = useHistory();

    const userConcertList = useSelector(store => store.concertsReducer);
    console.log('user concerts from database', userConcertList);
}