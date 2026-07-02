import { useContext, useState} from "react";
import { AppContext } from "../../Context/Appcontext";
import uploadIcon from "../../assets/upload.png";
import {toast} from "react-hot-toast";
import { addItem } from "../../Service/ItemService";

const ItemForm =()=>
{
  // in order to populate category we need category state 
  const {categories, setItemsData, itemsData, setCategories} = useContext(AppContext);
  const [image, setImage] = useState(false);
  const [loading, setLoading] = useState(false);
  // it will be object as we are goint to add a item into it means item inside category 
  const [data,setData]= useState({
    name:"",
    categoryId:"",
    price:"",
    description:"",
    stockQuantity: 0,       // ✅ NEW (defaults to 0)
  lowStockThreshold: 10,  // ✅ NEW (defaults to 10)
  });

     const onChangeHandler = (e) => {
      const value = e.target.value;
      const name =e.target.name;
      setData((data)=>({...data, [name]:value}));

     }

     const onSubmitHandler = async (e) =>{
      e.preventDefault();
      setLoading(true);
      const formData = new FormData();
      formData.append("item",JSON.stringify(data));
      formData.append("file",image);

      try{
        if(!image)
        {
          toast.error("Select image");
          return;
        }
          const response =  await addItem(formData);
          if(response.status === 201){
            setItemsData([...itemsData, response.data]);
            console.log(formData);
            // we need to set a category as well item count once user add the item that item is maped to category
            //TODO: update the category state
            setCategories((prevCategories)=>
            prevCategories.map((category)=> 
              category.categoryId === data.categoryId? {...category, items:category.items+1}:category));
            toast.success("item added");
            setData({
              name:"",
              description:"",
              categoryId:"",
              price:""
            }) 
            setImage(false);
            
          }else{
            toast.error("unable to add item ");
          }
      }catch(error){
        console.log(error);
        toast.error("Unable to add item");
      }
      finally{
        setLoading(false);
      }

     }

    return(
        <div className="item-form-container" style={{height:'100vh', overflowY:'auto',overflowX:'hidden'}}>
            <div className="mx-2 mt-2">
      <div className="row">
        <div className="card col-md-12">
          <div className="col-md-12 form-container">
            <div className="card-body ">
              <form onSubmit={onSubmitHandler}>
                <div className="mb-2">
                  <label htmlFor="image" className="form-lable">
                    <img src={image? URL.createObjectURL(image): uploadIcon} alt="" width={50} />
                  </label>
                  <input
                    type="file"
                    name="image"
                    id="image"
                    className="form-control"
                    hidden
                    onChange={(e)=> setImage(e.target.files[0])}

                   
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="name" className="form-lable">Name</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="form-control"
                    placeholder="Item Name"
                    onChange={onChangeHandler}
                    value={data.name}
                    required
                  />
                </div>
                <div className="mb-3">
                    <label className="form-lable" htmlFor="category">Category</label>
                    <select name="categoryId"
                     id="categoryId" 
                    className="form-control" 
                    onChange={onChangeHandler}
                    value={data.categoryId}
                    required
                    >
                        <option value="">--SELECT CATEGORY--</option>
                        {categories.map( ( (category, index) =>
                             <option key={index} value={category.categoryId}>{category.name}</option>
                        ))};
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Price</label>
                    <input type="number" 
                     name="price" id="price" 
                    className="form-control" 
                    placeholder="&#8377;200.00" 
                    onChange={onChangeHandler} 
                    value={data.price}
                    required
                    />
                </div>
                <div className="mb-2">
                  <label htmlFor="description" className="form-lable">description</label>
                  <textarea
                    rows="3.5"
                    name="description"
                    id="description"
                    className="form-control"
                    placeholder="Item description Hear..."
                    onChange={onChangeHandler}
                    value={data.description}
                    
                  ></textarea>
                </div>
                <div className="mb-3">
                  {/* //4/19/2026 */}
  <label htmlFor="stockQuantity" className="form-label">Stock Quantity</label>  
  <input
    type="number"
    name="stockQuantity"
    id="stockQuantity"
    className="form-control"
    placeholder="0"
    onChange={onChangeHandler}
    value={data.stockQuantity}
    min="0"
  />
</div>
<div className="mb-2">
  <label htmlFor="lowStockThreshold" className="form-label">Low Stock Alert At</label>
  <input
    type="number"
    name="lowStockThreshold"
    id="lowStockThreshold"
    className="form-control"
    placeholder="10"
    onChange={onChangeHandler}
    value={data.lowStockThreshold}
    min="0"
  />
</div>
{/* //4/19/2026 */}
                <button type="submit" className="btn btn-warning w-100" disabled={loading}>
                  {loading ? "Loading...":"Save"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
        </div>
    )

}
export default ItemForm;