import axios from "axios";

// for item creation read and delete simple user can only read items
export const addItem = async (item)=>{
   return await axios.post(`http://localhost:8080/api/v1.0/admin/items`,item 
        ,{headers:{'Authorization':`Bearer ${localStorage.getItem('token')}`}});
}

export  const deleteItem = async (itemId)=>{
      
     return await axios.delete(`http://localhost:8080/api/v1.0/admin/itemId/${itemId}`,
        {headers:{'Authorization':`Bearer ${localStorage.getItem('token')}`}});
}

export const fetchItems = async ()=>
{
    return await axios.get('http://localhost:8080/api/v1.0/items',
        {headers:{'Authorization':`Bearer ${localStorage.getItem('token')}`}});
}