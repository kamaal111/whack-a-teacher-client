import * as request from 'superagent';

import baseUrl from './urls';

export const USE_USER = 'USE_USER';
export const AUTHORIZE_USER = 'AUTHORIZE_USER';
export const ALL_LOBBIES = 'ALL_LOBBIES';

const loginUser = (status, user) => {
  return {
    type: USE_USER,
    payload: { status, user }
  };
};

export const createAccount = data => async dispatch => {
  try {
    const res = await request.post(`${baseUrl}/user`).send(data);

    if (res.body.data === 'OK') {
      const action = loginUser(res.body.data, {
        name: res.body.name,
        id: res.body.id,
        token: res.body.token
      });

      return dispatch(action);
    }

    const action = loginUser(res.body.data, null);
    return dispatch(action);
  } catch (error) {
    console.error(error);
  }
};

export const loginInAccount = data => async dispatch => {
  try {
    const res = await request.post(`${baseUrl}/login`).send(data);

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
  } catch (error) {
    console.error(error);
  }
};

export const authorizeUser = (token, userId, lobbyId) => async dispatch => {
  try {
    const res = await request
      .put(`${baseUrl}/user/${userId}`)
      .send({ id: lobbyId })
      .set('authorization', `Bearer ${token}`);

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
  } catch (error) {
    console.error(error);
  }
};

export const createLobbyAuthorization = (gameName, token) => async dispatch => {
  try {
    const res = await request
      .post(`${baseUrl}/lobby`)
      .send({ game: gameName })
      .set('authorization', `Bearer ${token}`);

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
  } catch (error) {
    console.error(error);
  }
};

export const allLobbies = payload => dispatch => {
  return dispatch({
    type: ALL_LOBBIES,
    payload
  });
};
