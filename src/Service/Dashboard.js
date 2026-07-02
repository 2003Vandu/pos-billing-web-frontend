import axios from "axios";

export const featchDashboardData = async () => {

   return await axios.get("http://localhost:8080/api/v1.0/dashboard",
        {
            headers: {'Authorization':`Bearer ${localStorage.getItem('token')}`}
        }
    );
};