import api from "../Util/api";

export const latestOrder = async () => {
    return await api.get("/orders/latest");
}

export const createOrder = async (order) => {
    return await api.post("/orders", order);
}

export const deleteOrder = async (id) => {
    return await api.delete(`/orders/${id}`);
}