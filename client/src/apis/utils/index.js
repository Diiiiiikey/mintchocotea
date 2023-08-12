import axios from './axiosInterceptors';

const BASE_URL = process.env.REACT_APP_API_URL;

export const instance = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

export const imgInstance = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'multipart/form-data; boundary=[{boundary_term}]' },
  withCredentials: true,
});

instance.defaults.timeout = 5000;

const token = localStorage.getItem('authorization');

instance.defaults.headers.common['authorization'] = `Bearer ${token}`;
imgInstance.defaults.headers.common['authorization'] = `Bearer ${token}`;
