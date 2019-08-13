import { USER_CREATED } from '../actions';

const initialState = {
  activeUser: null,
  status: 'NOT SIGNED'
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_CREATED:
      return { ...state, activeUser: payload.user, status: payload.status };

    default:
      return state;
  }
};
