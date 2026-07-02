import axios from "axios";

// get a list of order
export const latestOrder= async () => {

    return await axios.get("http://localhost:8080/api/v1.0/orders/latest",
        {headers:{'Authorization':`Bearer ${localStorage.getItem('token')}`}}
    );
}

// this create a new order
export const createOrder= async (order) => {

   return await axios.post("http://localhost:8080/api/v1.0/orders", order, 
            {headers:{'Authorization':`Bearer ${localStorage.getItem('token')}`}}
        );

}
 
// this will delete a order 
export const deleteOrder = async (id)=>{

   return await axios.delete(`http://localhost:8080/api/v1.0/orders/${id}`,
        {headers:{'Authorization':`Bearer ${localStorage.getItem('token')}`}}
    );
}