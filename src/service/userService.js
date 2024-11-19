import { API_ROUTES } from '../config/api/constants/apiRoutes';
import apiClient from '../config/api/apiClient';
import { handleError } from '../config/api/fetchErrors/handleError';

const getUser = async () => {
    const userInfo = JSON.parse(sessionStorage.getItem('user'));
    if (userInfo) {
        try {
            const uuid = userInfo.uuid;
            const response = await apiClient.get(`${API_ROUTES.GET_USER_BY_UUID}${uuid}`);
            console.log("Fetch User Config (Before):", apiClient.defaults);
            const data = response.data;
            const status = response.status;
            return { data, status };
          } catch (error) {
            handleError(error);
          }
    }
}

export { getUser };