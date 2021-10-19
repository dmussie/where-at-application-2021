const concertsReducer = (state = [], action) => {
    switch (action.type) {
        case 'FETCH_CONCERTS':
            return action.payload;
        case 'UNFETCH_CONCERTS':
            return [];
        default:
            return state;
    }
};

export default concertsReducer;