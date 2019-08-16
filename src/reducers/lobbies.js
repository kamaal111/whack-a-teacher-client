import { ALL_LOBBIES } from '../actions';

const initialState = [];

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ALL_LOBBIES:
      return payload;

    default:
      return state;
  }
};
