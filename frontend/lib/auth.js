function setToken(token) {
  localStorage.setItem('token', token)
}

function isLoggedIn() {
  const isLoggedIn = !!localStorage.getItem('token')
  return isLoggedIn
}

function logout() {
  localStorage.removeItem('token')
}

function getToken() {
  return localStorage.getItem('token')
}
function getUserId() {
  const token = getToken()
  if (!token) return false
  const parts = token.split('.')
  return JSON.parse(atob(parts[1])).sub
}

export default {
  setToken,
  isLoggedIn,
  logout,
  getToken,
  getUserId
}


// class Auth {
//   static setToken(token) {
//     localStorage.setItem('token', token)
//   }

//   static getToken() {
//     return localStorage.getItem('token')
//   }

//   static logout() {
//     localStorage.removeItem('token')
//   }

//   static getUserId() {
//     const token = this.getToken()
//     if (!token) return false
//     const parts = token.split('.')
//     return JSON.parse(atob(parts[1])).sub
//   }

//   static isAuthorized() {
//     return this.getToken()
//   }

// }

// export default Auth