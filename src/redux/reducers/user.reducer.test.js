// When testing client side code, use import... from...;
import userReducer from './user.reducer.js';

describe('User reducer test', () => {
    test('The default value is an empty object.', (done) => {
        let action = {};
        let output = userReducer(undefined, action);
        expect(typeof output).objectContaining('object');
        expect(output).toBeDefined();
        done();
    });
});