import "./CategoryList.css";
import { useContext, useState } from "react";
import { AppContext } from "../../Context/Appcontext";
import { deleteCategory } from "../../Service/CatehoryService";
import toast from "react-hot-toast";

const CategoryList = () => {
  const { categories, setCategories } = useContext(AppContext);
  const [searchTerm , setSearchTerm] = useState('');

  const filterCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const deleteByCategoryId = async (categoryId) =>{

    try {
        const response = await deleteCategory(categoryId);
        if(response.status === 204)
        {
            const updatedcategories = categories.filter(category=> category.categoryId !== categoryId)
            setCategories(updatedcategories);
            toast.success("Category deleted");
        }else
        {
            toast.error("Unable to delete category ");

        }
    } catch (error) {
        console.error(error);
        toast.error("Unable to delete category ");
    }

  }

  return (
    <div
      className="category-list-container"
      style={{ height: "100vh", overflowY: "auto", overflowx: "hidden" }}
    >
      
      <div >
        <div className="input-group mb-2">
            <input type="text" 
                   name="keyword" 
                   id="keyword" 
                   placeholder="search by keyword" 
                   className="form-control"
                   onChange={(e)=>setSearchTerm(e.target.value)}
                   value={searchTerm}
                   /><span className="input-group-text bg-warning">
                    <i className="bi bi-search"></i>
                   </span>
        </div>
      </div>
      <div className="row g-3 pe-2">
        {filterCategories.map((category, index) => (
          <div key={index} className="col-12">
             <div
              className="card p-1"
              style={{ backgroundColor: category.bgColor }}
            >
              <div className="d-flex align-items-center">
                <div style={{ marginRight: "20px" }}>
                  <img src={category.imgUrl} alt={category.name} 
                  className="category-image" 
                 />
                </div>
                <div className="flex-grow-1">
                    <h5 className="mb-1 text-white">{category.name}</h5>
                    <p className="mb-0 text-white"> {category.items} items</p>
                </div>
                <div>
                    <button className="btn btn-danger btn-sm"
                     onClick={(e)=> deleteByCategoryId(category.categoryId)}>
                        <i className="bi bi-trash"></i>
                    </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default CategoryList;
