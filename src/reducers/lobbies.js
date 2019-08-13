import { ALL_LOBBIES } from '../actions';

export default (state = [], action = {} ) => {
  switch (action.type) {
    case ALL_LOBBIES:
      return action.payload;

    default:
      return state;
  }
};
