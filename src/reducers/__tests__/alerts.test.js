import { Reducer } from 'redux-testkit';
import { ADD_ALERT, REMOVE_ALERT } from './../../constants/actionTypes';
import alerts from './../alerts';

const initialState = {
  pending: [],
  id: 0
}

const existingState = {
  pending: [{id: 6, level: 'warning'}, {id: 3, level: 'info'}],
  id: 8
}

describe('reducers/alerts', () => {
  it('should have initial state', () => {
    expect(alerts()).toEqual(initialState);
  });

  it('should not affect state', () => {
    Reducer(alerts).expect({ type: 'NOT_EXISTING' }).toReturnState(initialState);
  });

  it('should add alerts', () => {
    const action = { type: ADD_ALERT, level: 'warning', text: 'Some text' };
    Reducer(alerts).expect(action).toReturnState({
      id: initialState.id + 1,
      pending: [{ id: initialState.id + 1, level: action.level, text: action.text }]
    });
  });

  it('should remove alerts by id', () => {
    const action = { type: REMOVE_ALERT, id: 3 };
    Reducer(alerts).withState(existingState).expect(action).toReturnState({
      pending: [{ id: 6, level: 'warning' }],
      id: 8
    });
  });
})
