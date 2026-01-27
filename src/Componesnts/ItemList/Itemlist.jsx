
// now we have to display list amd we are already featching a data in AppContext using setItemsData();

import { useContext, useState } from "react";
import { AppContext } from "../../Context/Appcontext";
import { deleteItem } from "../../Service/ItemService";
import toast from "react-hot-toast";
import './ItemList.css'

// we just have to retruve a setItemsData in list component 
const ItemList=()=>{

    // we want a item data to display we use AppContext for globle state in that we featch a item already 
    const {itemsData,setItemsData} = useContext(AppContext);

    // we want a state for search items 
    const[searchTerm, setSearchTerm] = useState("");// emty string 

    // function for searching a item 
    const filterItems = itemsData.filter((item) => {
            return item.name?.toLowerCase().includes(searchTerm.toLowerCase());
      });


    const removeItem = async (itemId)=>{
        try{
           const response = await deleteItem(itemId);
           if(response.status===204)
           {
            const updatedItems = itemsData.filter(item => item.itemId !== itemId);
            setItemsData(updatedItems);
            toast.success("item deleted");
           }else{
            toast.error("item is unable to delete");
           }
        }catch(error){

            console.log(error);
            toast.error("unable to delete item");

        }
    }

    return(
        <div
      className="category-list-container"
      style={{  height: "100vh", overflowY: "auto", overflowx: "hidden"  }}
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
      <div className="row g-3 pe-1">
        {filterItems.map((item, index)=>(
            <div className="col-12" key={index}>
                <div className="card p-1 bg-dark">
                    <div className="d-flex align-items-center">
                        <div className="item-image"  style={{marginRight:'15px'}}>
                            <img src={item.imgUrl} alt={item.name} />
                        </div>
                        <div className="flex-grow-1 ">
                            <h6 className="mb-0 text-white">{item.name}</h6>
                            <p className="mb-0 text-white">Category: {item.categoryName}</p>
                            <span className="mb-0 text-black badge rounded-pill text-bg-warning">
                            &#8377;{item.price}
                        </span>
                        </div>
                        <div>
                        <button className="btn btn-danger btn-sm" onClick={()=>removeItem(item.itemId)}>
                          <i className="bi bi-trash"></i>
                        </button>
                    </div> 
                    </div>
                </div>
            </div>
        ))}
      </div>
    </div>
    )
}
export default ItemList;