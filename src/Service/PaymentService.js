import axios from "axios";


// this will give us the data contain amount and currency 
export const createrazorpayOrder = async (data) => {

   return await axios.post(`http://localhost:8080/api/v1.0/payments/create-order`,data,
        {
            headers:{'Authorization':`Bearer ${localStorage.getItem('token')}`}
        }
   );

}

export const verifyPayment= async (paymentData)=>{

   return await axios.post('http://localhost:8080/api/v1.0/payments/verify',paymentData,
        {
            headers:{'Authorization':`Bearer ${localStorage.getItem('token')}`}
        }
    );
}