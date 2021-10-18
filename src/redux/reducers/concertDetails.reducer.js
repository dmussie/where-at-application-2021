const concertDetailsReducer = (state = [], action) => {
    switch(action.type) {
        case 'FETCH_CONCERT_DETAILS':
            return action.payload;
        default:
            return state;
    }
};

export default concertDetailsReducer;