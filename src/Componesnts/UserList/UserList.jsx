import { useState } from "react";
import { deleteUser } from "../../Service/UserService";
import {toast} from "react-hot-toast";

const Userlist =({users,setUsers})=>
{
    const [searchTerm , setSearchTerm] = useState("");

    // we going to get single user object and we will filter it by name 
    const filteredUsers = users.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const deleteByUserId = async(id) => {
        try{
               const response = await deleteUser(id);
               setUsers(prevUsers => prevUsers.filter(user=> user.userId !== id)); 
               toast.success("User deleted ");
        }catch(e){

            console.error(e);
            toast.error("Unnable to delet the user");
        }

    }
    
    return(
        <div
      className="category-list-container"
      style={{ height: "100vh", overflowY: "auto", overflowx: "hidden" }}
    >
      
      <div >
        <div className="input-group mb-2">
            <input type="text" 
                   name="Keyword" 
                   id="keyword" 
                   placeholder="search by keyword" 
                   className="form-control"
                   onChange={(e)=>setSearchTerm(e.target.value)}
                   value={searchTerm}
                   />
                   <span className="input-group-text bg-warning">
                    <i className="bi bi-search"></i>
                   </span>
        </div>
      </div>  
      <div className="row g-3 pe-2 ">
        {
            filteredUsers.map((user,index)=>(
                <div key={index} className="col-12">
                    <div className="card p-1 bg-dark ">
                       <div className="d-flex justify-content-between ">
                        <div className="flex-grow-1">
                            <h5 className="mb-0 text-white">{user.name}</h5>
                            <p className="mb-0 text-white">{user.email}</p>
                            <p className="mb-0 text-white">{user.role}</p>
                        </div>
                        <div>
                            <button className="btn btn-danger btn-sm" onClick={()=> deleteByUserId(user.userId)}>
                                <i className="bi bi-trash " />
                            </button>
                        </div>
                       </div>
                    </div>
                </div>
            ))
        }
      </div>
    </div>
    )
}
export default Userlist;