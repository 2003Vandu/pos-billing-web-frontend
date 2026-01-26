import { useState } from "react";
import { toast } from "react-hot-toast";
import { addUser } from "../../Service/UserService";
const UserForm =({setUsers})=>
{
    const [loading, setLoding] = useState(false);
    const [error,setError] = useState(null);
    const [data , setData] = useState({
      name:"",
      email:"",
      password:"",
      role:"ROLE_USER"
    });

    const onChangeHandler =(e)=>{
       const value = e.target.value;
       const name = e.target.name;
       setData( (data) => ( {...data, [name]:value} ) )
    }

    const onSubmitHandler= async (e)=>{
      e.preventDefault();
      setLoding(true);
      try{
       const response= await addUser(data);
       setUsers( (prevUsers) => [...prevUsers, response.data]);
       toast.success("User Addes Succesfully!");
       setData({
        name:"",
        email:"",
        password:"",
        role:"ROLE_USER"
       })
       
      }catch(e)
      {
        console.error(e);
        toast.error("error adding users");
      }
      finally{
        setLoding(false);
      }
      
    }


    return(
        <div className="mx-2 mt-2">
      <div className="row">
        <div className="card col-md-12">
          <div className="col-md-12 form-container">
            <div className="card-body ">
              <form onSubmit={onSubmitHandler}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-lable">Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="form-control"
                    placeholder="john dho"
                    onChange={onChangeHandler}
                    value={data.name}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-lable">Email
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    className="form-control"
                    placeholder="yourname@example.com"
                    onChange={onChangeHandler}
                    value={data.email}
                  />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-lable">Password</label>
                    <br />
                    <input type="password" 
                           name="password"
                           id="password"
                           placeholder="******************" 
                           onChange={onChangeHandler}
                           value={data.password}
                           />
                </div>
                <button type="submit" className="btn btn-warning w-100" disabled={loading}>
                  {loading? "Loding...": "save"}
                  </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}
export default UserForm;