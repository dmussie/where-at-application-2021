// this reducer temporarily stores saved concert data 
const savedConcertsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_SAVED_CONCERTS':
            return action.payload;
        case 'UNSET_SAVED_CONCERTS':
            return [];
        default:
            return state;
    }
};

export default savedConcertsReducer;