import { USER_CREATED } from '../actions'

export default function (state = [], action = {}) {
  switch(action.type) {
    case USER_CREATED:
      return action.payload
    default:
      return state
  }
}