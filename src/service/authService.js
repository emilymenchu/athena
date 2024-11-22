import { API_ROUTES } from '../config/api/constants/apiRoutes';
import apiClient from '../config/api/apiClient';

const login = async (username, password) => {
    try {
        const response = await apiClient.post(API_ROUTES.LOGIN, { username, password });
        const token = response.headers['authorization'];
        const status = response.status;
        console.log('Headers: ', token);
        return { token, status }; 
    } catch (error) {
        if (error.response) {
          // Si hay un error, obtén el status code de la respuesta
          const status = error.response.status;
          const message = error.response.data.razon_de_acceso_denegado;
        //   console.error('Login error: ', message)
          throw { message, status }; // Retorna un error con el status code
        } else {
        //   console.error('Network error:', error);
          throw { message: 'Error de red', status: null };
        }
      }
};

const fetchUserInfo = async () => {
  try {
    const response = await apiClient(API_ROUTES.PROFILE);
    const data = response.data;
    const status = response.status;
    return { data, status };
  } catch (error) {
    console.log('New error', error)
    if (error.response) {
      const status = error.response.status;
      const message = error.response.data;
      throw { message, status }; 
    } else {
      throw { message: 'Error de red', status: null };
    }
  }
}

export { login, fetchUserInfo };