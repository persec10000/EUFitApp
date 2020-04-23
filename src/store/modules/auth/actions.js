export function signInRequest(username, password) {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: {username, password},
  };
}

export function signInSuccess(token, user) {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: {token, user},
  };
}

export function signUpRequest(nome, username, password) {
  return {
    type: '@auth/SIGN_UP_REQUEST',
    payload: {nome, username, password},
  };
}

export function signFailure() {
  return {
    type: '@auth/SIGN_FAILURE',
  };
}

export function signOut() {
  return {
    type: '@auth/SIGN_OUT',
  };
}
