require('dotenv').config();
const axios = require('axios');
const jwt_decode = require('jwt-decode'); // Assurez-vous que vous avez importé jwt-decode

function loginTest(email, password) {
  return axios({
    method: 'post',
    url: `${process.env.NEXT_PUBLIC_API_URL}api/auth/login`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      email: email,
      password: password,
    },
  })
    .then((response) => {
      const accessToken = response.data.data.accessToken;
      const decodedToken = jwt_decode(accessToken);
      return decodedToken.data.permission_level; // Renvoie le niveau de permission
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
}

module.exports = loginTest;
