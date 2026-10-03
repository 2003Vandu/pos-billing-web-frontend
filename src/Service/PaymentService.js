import api from "../Util/api";

export const createrazorpayOrder = async (data) => {
    return await api.post('/payments/create-order', data);
}

export const verifyPayment = async (paymentData) => {
    return await api.post('/payments/verify', paymentData);
}