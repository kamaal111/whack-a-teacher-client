import { request } from 'superagent'
// const baseUrl = 'NEED_URL'

export const USER_CREATED = 'USER_CREATED'

const newUser = payload => {
  return {
    type: USER_CREATED,
    payload
  }
}

export const createAccount = data => dispatch => {
  // request
  //   .post(`${baseUrl}/login`)
  //   .send(data)
  //   .then(res => {
  //     const action = newUser(res.body)
  //     dispatch(action)
  //   })
  //   .catch(console.error)
}