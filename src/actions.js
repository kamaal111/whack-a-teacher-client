import * as request from 'superagent'
// const baseUrl = 'https://morning-caverns-95025.herokuapp.com'
const baseUrl = 'http://localhost:4000'

export const USER_CREATED = 'USER_CREATED'

const newUser = payload => {
  return {
    type: USER_CREATED,
    payload
  }
}

export const createAccount = data => dispatch => {
  request
    .post(`${baseUrl}/user`)
    .send(data)
    .then(res => {
      const action = newUser(res.body)
      dispatch(action)
    })
    .catch(console.error)
}