const handleError = (error) => {
    if (error.response) {
        const status = error.response.status;
        const message = error.response.data;
        throw { message, status }; 
    } else {
        throw { message: 'Error de red', status: null };
    }
};

export { handleError };