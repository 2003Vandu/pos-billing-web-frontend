import api from "../Util/api";

export const login = async (data) => {
    return await api.post("/login", data);
}