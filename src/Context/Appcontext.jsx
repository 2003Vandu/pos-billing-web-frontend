import { createContext, useEffect, useState } from "react";
import { fetchCategories } from "../Service/CatehoryService";
import { fetchItems } from "../Service/ItemService"; 

export const AppContext = createContext(null);

export const AppContextProvider=(props) =>{

    //once we featch the category we need to store a data we use to store in state when we featch state change 
     const [categories, setcategories] = useState([]);
     const [itemsData,setItemsData]=useState([]);
     //For login details store
     const [auth,  setAuth] = useState({token:null, role:null})


    // creat useeffect we can automatically load a categories
    useEffect(()=>{
         async function loadData(){
              
            // we need to update actual authData
              if(localStorage.getItem("token")&& localStorage.getItem("role"))
              {
                         setAuthData(
                              localStorage.getItem("token"),
                              localStorage.getItem("role")
                         )
              }
              const response = await fetchCategories();
              const itemResponse = await fetchItems();
              console.log("Fetched categories from backend:", response.data);
              //If your backend returns an array directly: then this 
              setcategories(response.data); // or // this  response.data.categories

              // we fetch items data from backend hear and store as array 
              setItemsData(itemResponse.data);
         }
         loadData();
    }, [])

    const setAuthData = (token, role) => {

     setAuth({token,role});
    }

    const contextValue={
        categories, 
        setCategories: setcategories ,
        auth,
        setAuthData: setAuthData,
        itemsData,
        setItemsData: setItemsData
    }
    return <AppContext.Provider value={contextValue} >
              {props.children}
         </AppContext.Provider>
}

