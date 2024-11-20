const baseRoute= '/dashboard'

export const routes = {
    HOME: `${baseRoute}/home`,
    ANALYTICS: `${baseRoute}/analytics`,
    PRODUCT: {
        PRODUCTS: `${baseRoute}/product/products`,
    },
    ORDER: {
        ORDERS: `${baseRoute}/order/orders`,
    },
    CLIENT: {
        CLIENTS: `${baseRoute}/client/clients`,
    },
    USER: {
        USERS: `${baseRoute}/user/users`,
        CREATE_USER: `${baseRoute}/user/create-user`,
        MODIFY_USER: `${baseRoute}/user/modify-user`,
    },
    STOCK: `${baseRoute}/stock`,
    TASKS: `${baseRoute}/tasks`,
    ACCOUNT: {
        MY_ACCOUNT: `${baseRoute}/account/my-account`
    }
}