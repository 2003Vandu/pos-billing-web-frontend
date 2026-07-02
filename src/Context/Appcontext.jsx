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

     //cartitem component **>>for CartItemComponent
     const [cartItems, setCartItems]= useState([]);

    {/** function for the cartitem component inside explore  */} //**>>for CartItemComponent
    const addToCart = (item) => {
    setCartItems(prevCartItems => {
    const existingItem = prevCartItems.find(cartItem => cartItem.itemid === item.itemid);
    if (existingItem) {
      // ✅ Don't exceed available stock 
      if (existingItem.quantity >= item.stockQuantity) return prevCartItems;//4/19/2026
      return prevCartItems.map(cartItem =>
        cartItem.itemid === item.itemid
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
    } else {
      return [...prevCartItems, { ...item, quantity: 1 }];
    }
  });
};

    // we add a function in cartitem  remove -  add/updatequantity + and delete button  **>>for CartItemComponent
    const removeFromCart =(itemid)=>{
        setCartItems(cartItems.filter(item=> item.itemid !== itemid))
    }

    //updatequantity **>>for CartItemComponent
    const updateQuantity =(itemid,newQuantity)=>{
      // ✅ Don't exceed stock, don't go below 1
      const clamped = Math.min(newQuantity, item.stockQuantity || newQuantity); //4/19/2026
      setCartItems(cartItems.map(item=> item.itemid == itemid ?
        {...item, quantity: newQuantity}:item
      ));
    }
    

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

    const clearCart=() =>{
      setCartItems([]);
    }

    const contextValue={
        categories, 
        setCategories: setcategories ,
        auth,
        setAuthData: setAuthData,
        itemsData,
        setItemsData: setItemsData,
        cartItems,
        setCartItems: setCartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart
    }
    return <AppContext.Provider value={contextValue} >
              {props.children}
         </AppContext.Provider>
}

