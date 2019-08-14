import * as request from 'superagent';

// const baseUrl = 'https://morning-caverns-95025.herokuapp.com';
const baseUrl = 'http://localhost:4000';

export const USE_USER = 'USE_USER';
export const AUTHORIZE_USER = 'AUTHORIZE_USER';
export const ALL_LOBBIES = 'ALL_LOBBIES';

const loginUser = (status, user) => {
  return {
    type: USE_USER,
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

export const authorizeUser = (token, userId, lobbyId) => async dispatch => {
  const res = await request
    .put(`${baseUrl}/user/${userId}`)
    .send({ id: lobbyId })
    .set('authorization', `Bearer ${token}`);

  console.log(res.body);

  if (res.body.data === 'OK') {
    return dispatch({
      type: AUTHORIZE_USER,
      payload: true
    });
  }

  return dispatch({
    type: AUTHORIZE_USER,
    payload: false
  });
};

export const createLobbyAuthorization = (gameName, token) => async dispatch => {
  const res = await request
    .post(`${baseUrl}/lobby`)
    .send({ game: gameName })
    .set('authorization', `Bearer ${token}`);

  console.log(res.body);

  if (res.body.data === 'OK') {
    return dispatch({
      type: AUTHORIZE_USER,
      payload: true
    });
  }

  return dispatch({
    type: AUTHORIZE_USER,
    payload: false
  });
};

export const allLobbies = payload => dispatch => {
  return dispatch({
    type: ALL_LOBBIES,
    payload
  });
};
