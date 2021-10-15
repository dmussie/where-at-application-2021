const concertsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_CONCERTS':
            return action.payload;
        case 'UNSET_CONCERTS':
            return [];
        default:
            return state;
    }
};

export default concertsReducer;