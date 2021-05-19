import { Thunk } from 'redux-testkit';
import { loginUser } from './../authentication';
import {
  LOGIN_REQUEST, LOGIN_FAILURE, ADD_ALERT
} from './../../constants/actionTypes';


describe('store/topics/actions', () => {

  it('should fail to login', async () => {
    const dispatches = await Thunk(loginUser).execute({email: 'somemail@mail.bg', password: '123123'});
    expect(dispatches.length).toBe(3);
    expect(dispatches[0].isPlainObject()).toBe(true);
    expect(dispatches[0].getAction()).toEqual({ type: LOGIN_REQUEST, isFetching: true, isAuthenticated: false });
    expect(dispatches[1].getAction()).toEqual({ type: LOGIN_FAILURE, isFetching: false, isAuthenticated: false });
    expect(dispatches[2].getAction()).toEqual({ type: ADD_ALERT, level: 'error', text: 'Unexpected token < in JSON at position 0'})

  });

});
