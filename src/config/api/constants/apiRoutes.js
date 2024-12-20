const BASE_URL = 'http://localhost:8090/tienda/api/v1';

const API_ROUTES = {
    LOGIN: '/auth/login',
    PROFILE: '/auth/profile',
    GET_USER_BY_UUID: '/usuario/uuid/'
};

const SUCURSALES_ROUTES = {
    GET_ALL: '/sucursal/all'
}

export { BASE_URL, API_ROUTES, SUCURSALES_ROUTES }