const concertsReducer = (state = [], action) => {
    switch (action.type) {
        case 'FETCH_CONCERTS':
            return action.payload;
        case 'UNSET_CONCERTS':
            return [];
        default:
            return state;
    }
};

export default concertsReducer;