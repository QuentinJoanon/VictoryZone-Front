import axios from 'axios';

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const originalRequest = error.config;

    // Vérifiez si l'erreur est due à un token expiré
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      return axiosInstance
        .post(`${process.env.NEXT_PUBLIC_API_URL}api/auth/refresh-token`, {
          refreshToken: localStorage.getItem('refreshToken'),
        })
        .then((response) => {
          // Vérifiez si la requête de rafraîchissement du token a réussi
          if (response.status === 200) {
            const newAccessToken = response.data.data.accessToken;
            const refreshToken = response.data.data.refreshToken;
            localStorage.setItem('accessToken', newAccessToken);
            localStorage.setItem('refreshToken', refreshToken);

            originalRequest.headers[
              'Authorization'
            ] = `Bearer ${newAccessToken}`;
            return axiosInstance(originalRequest);
          } else {
            // Gérer l'erreur de rafraîchissement du token ici
            // Vous pouvez rediriger vers la page de connexion ou effectuer toute autre action nécessaire
            console.log('Erreur lors du rafraîchissement du token');
          }
        })
        .catch((error) => {
          // Gérer l'erreur de rafraîchissement du token (par exemple, déconnexion de l'utilisateur)
          // Vous pouvez rediriger vers la page de connexion ou effectuer toute autre action nécessaire
          console.log(error);
        });
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
