import { useContext, useEffect, useState } from "react";
import uploadIcon from "../../assets/upload.png";
import {addCategory} from "../../Service/CatehoryService.js"
import { AppContext } from "../../Context/Appcontext.jsx"; 
import {toast} from "react-hot-toast"


const CategoryForm = () => {
       
     const {setCategories, categories} =   useContext(AppContext);

  // local state 
  const [loading ,setLoding] = useState(false);
  const [image , setImage] = useState(false);
  const [data , setDate] = useState(
    {
      name: "",
      Description: "",
      bgColor:"#2c2c2c",
    });

    useEffect(()=>{
         console.log(data);
    },[data]);

    const onChageHandler =(e) =>{
      const value=e.target.value;
      const name= e.target.name;
      setDate(()=> ({...data, [name]: value}))
    }

    // APIS CALL to create catgory
    const onsubmitHandler  = async (e) => {
      // we sto reloding entire web page 
      e.preventDefault();

      // to lod only when we sub,it form 
      setLoding(true);

      if(!image)
      {
        toast.error("select image for categry");
        setLoding(false); 
        return;
      }
      //object of the form 
      const formData = new FormData();
      formData.append("category", JSON.stringify(data));
      formData.append("file", image)
      try {
        const response = await addCategory(formData);
        if(response.status === 201 )
        {
          setCategories([...categories, response.data])
          toast.success("Category added");
          setDate(
            {
              name:"",
              Description:"",
              bgColor:"2c2c2c"
            }
          ); 
          setImage(false);
        }
      } catch (error) {
        console.error(error);
        toast.error("error adding category");
        
      }
      finally{
        setLoding(false);
      }

            
    }

  return (
    <div className="item-form-container" style={{height:'100vh', overflowY:'auto',overflowX:'hidden'}}>
    <div className="mx-5 mt-5">
      <div className="row">
        <div className="card col-md-12">
          <div className="col-md-12 form-container">
            <div className="card-body mt-5">
              <form onSubmit={onsubmitHandler}>  
                <div className="mb-3">
                  <label htmlFor="image" className="form-lable">
                    <img src={image ? URL.createObjectURL(image) : uploadIcon} alt="" width={50}/>
                  </label>
                  <input
                    type="file"
                    name="image"
                    id="image"
                    className="form-control"
                    hidden
                    onChange={(e)=>setImage(e.target.files[0])}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="name" className="form-lable">Name</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="form-control"
                    placeholder="Category Name"
                    onChange={onChageHandler}
                    value={data.name}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="Discription" className="form-lable">Description</label>
                  <textarea
                    rows="3.5"
                    name="Description"
                    id="Description"
                    className="form-control"
                    placeholder="Write content Hear"
                    onChange={onChageHandler}
                    value={data.Description}
                  ></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="bgcolor" className="form-lable">Background color</label>
                    <br />
                    <input type="color" 
                           name="bgColor"
                           id="bgColor"
                           onChange={onChageHandler}
                           value={data.bgColor}
                           placeholder="#ffffff"
                            />
                </div>
                <button type="submit" 
                          disabled={loading}
                 className="btn btn-warning  w-100">{loading ? "Loding...":"Submit" }</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default CategoryForm;
