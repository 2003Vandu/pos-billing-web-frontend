import { useContext, useState } from "react";
import "./Login.css";
import toast from "react-hot-toast";
import { login } from "../../Service/AuthService";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/Appcontext";

const Login = () => {
    
    const {setAuthData} = useContext(AppContext);
    const navigate = useNavigate();
    const[loading,SetLoding] = useState(false);

    //this is object contain email and password of login
    const[data , setData]= useState({
        email:"",
        password:"",
    });

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setData( (data) => ( { ...data, [name]:value } ) );

         
    }

    const onSubmitHandler = async (e) =>{
        e.preventDefault();
        SetLoding(true)
        try{
             const response= await login(data);
             if(response.status === 200)
             {
                toast.success("login Successfull")
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("role", response.data.role);
                setAuthData(response.data.token, response.data.role);
                navigate("/dashboard");
             }

        }catch(error)
        {
            console.error(error);
            toast.error("Email/password invalid");
        }finally{
            SetLoding(false);
        }

    }


  return (
    <div className="bg-light d-flex align-items-center justify-content-center vh-100 login-background">
      <div className="card shoado-lg w-100" style={{ maxWidth: "480px" }}>
        <div className="card-body">
          <div className="text-center">
            <h1 className="card-title">Sign in</h1>
            <p className="card-text text-black">
              Sign in below to access your account
            </p>
          </div>
          <div className="mt-4">
            <form onSubmit={onSubmitHandler}>
              <div className="mb-4">
                <label htmlFor="email" className="form-lable text-black">
                  Email adress
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  placeholder="yourname@example.com "
                  className="form-control"
                  onChange={onChangeHandler}
                  value={data.email}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="form-lable text-black">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="********"
                  className="form-control"
                  onChange={onChangeHandler}
                  value={data.password}
                />
              </div>
              <div className="d-grid">
                <button type="submit" className="btn btn-dark btn-lg" disabled={loading}>
                {loading ? "Loding..": "Sign in"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
