class Auth {
  static loggedIn() {
    return Boolean(sessionStorage.token);
  }

  static logOut() {
    sessionStorage.removeItem('token');
  }
}

export default Auth;