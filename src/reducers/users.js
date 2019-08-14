import { USE_USER, AUTHORIZE_USER } from '../actions';

const initialState = {
  activeUser: null,
  status: 'NOT SIGNED',
  authorized: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case USE_USER:
      return {
        ...state,
        activeUser: payload.user,
        status: payload.status,
        authorized: true
      };

    case AUTHORIZE_USER:
      return { ...state, authorized: payload };

    default:
      return state;
  }
};
