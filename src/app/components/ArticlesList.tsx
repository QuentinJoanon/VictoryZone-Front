// 'use client';

import axios, { AxiosError } from 'axios';

export default function ArticlesList() {
  const API_URL =
    'https://projet-14-victory-zone-back-production.up.railway.app/';

  return axios
    .get(`${API_URL}api/articles`)
    .then(function (response) {
      console.log(response.data.data);
      return response.data.data;
    })
    .catch(function (error) {
      console.log(error);
      throw error;
    });
}
