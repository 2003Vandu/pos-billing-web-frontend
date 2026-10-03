import api from "../Util/api";

export const featchDashboardData = async () => {
    return await api.get("/dashboard");
};