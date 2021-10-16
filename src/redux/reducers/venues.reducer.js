const venuesReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_VENUES':
            return action.payload;
        case 'UNSET_VENUES':
            return [];
        default:
            return state;
    }
};

export default venuesReducer;