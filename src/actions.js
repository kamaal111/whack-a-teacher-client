import * as request from 'superagent';

const baseUrl = 'https://morning-caverns-95025.herokuapp.com';
// const baseUrl = 'http://localhost:4000';

export const USER_CREATED = 'USER_CREATED';
export const ALL_LOBBIES = 'ALL_LOBBIES';

const loginUser = (status, user) => {
  return {
    type: USER_CREATED,
    payload: { status, user }
  };
};

export const createAccount = data => dispatch => {
  request
    .post(`${baseUrl}/user`)
    .send(data)
    .then(res => {
      if (res.body.data === 'OK') {
        const action = loginUser(res.body.data, {
          name: res.body.name,
          id: res.body.id,
          token: res.body.token
        });

        return dispatch(action);
      }

      const action = loginUser(res.body.data, {});
      return dispatch(action);
    })
    .catch(console.error);
};

export const loginInAccount = data => dispatch => {
  request
    .post(`${baseUrl}/login`)
    .send(data)
    .then(res => {
      if (res.body.data === 'OK') {
        const action = loginUser(res.body.data, {
          name: res.body.name,
          id: res.body.id,
          token: res.body.token
        });

        return dispatch(action);
      }

      const action = loginUser(res.body.data, {});
      return dispatch(action);
    });
};

export const allLobbies = payload => dispatch => {
  return dispatch({
    type: ALL_LOBBIES,
    payload
  });
};
