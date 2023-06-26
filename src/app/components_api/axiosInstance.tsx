import axios from 'axios';

const axiosInstance = axios.create();

// Add the interceptors to the axios instance
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

    // Check if the error is due to an expired token
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
          // Check if the token refresh request is successful
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
            // Handle token refresh error here
            // You can redirect to the login page or perform any other necessary action
            console.log('Error refreshing token');
          }
        })
        .catch((error) => {
          // Handle token refresh error (e.g., user logout)
          // You can redirect to the login page or perform any other necessary action
          console.log(error);
        });
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
