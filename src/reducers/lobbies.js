import { ALL_LOBBIES } from '../actions';

export default (state = { lobbies: [] }, { type, payload }) => {
  switch (type) {
    case ALL_LOBBIES:
      return { ...state, lobbies: payload };

    default:
      return state;
  }
};
