import { USE_USER, AUTHERIZE_USER } from '../actions';

const initialState = {
  activeUser: null,
  status: 'NOT SIGNED',
  autherized: false
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case USE_USER:
      return {
        ...state,
        activeUser: payload.user,
        status: payload.status,
        autherized: true
      };

    case AUTHERIZE_USER:
      return { ...state, autherized: payload };

    default:
      return state;
  }
};
