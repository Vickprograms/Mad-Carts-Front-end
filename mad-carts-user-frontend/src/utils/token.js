import jwt_decode from 'jwt-decode';

export const saveToken = (token) => localStorage.setItem('mad_token', token);
export const getToken = () => localStorage.getItem('mad_token');
export const removeToken = () => localStorage.removeItem('mad_token');
export const decodeToken = (token) => {
  try {
    return jwt_decode(token);
  } catch {
    return null;
  }
};
