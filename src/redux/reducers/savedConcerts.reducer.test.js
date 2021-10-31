import savedConcertsReducer from "./savedConcerts.reducer";

describe('Saved Concerts reducer test', () => {
    test('The default value is an empty array.', (done) => {
        let action = [];
        let output = savedConcertsReducer(undefined, action);
        expect(typeof output).toBe('object');
        expect(output).toBeDefined();
        done();
    });
});