const concertDetailsReducer = (state = [], action) => {
    switch(action.type) {
        case 'FETCH_CONCERT_DETAILS':
            return action.payload;
        case 'UNSET_CONCERT_DETAILS':
            return [];
        default:
            return state;
    }
};

export default concertDetailsReducer;