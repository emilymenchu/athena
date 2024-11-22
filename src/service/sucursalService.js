import { SUCURSALES_ROUTES } from '../config/api/constants/apiRoutes';
import apiClient from '../config/api/apiClient';
import { handleError } from '../config/api/fetchErrors/handleError';

const getSucursales = async () => {

        try {
            const response = await apiClient.get(SUCURSALES_ROUTES.GET_ALL);
            const data = response.data;
            return data;
          } catch (error) {
            handleError(error);
          }

}

export { getSucursales };