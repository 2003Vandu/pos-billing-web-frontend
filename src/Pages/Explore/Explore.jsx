import { useContext, useState } from 'react';
import './Explore.css';
import { AppContext } from '../../Context/Appcontext';
import DisplayCategory from '../../Componesnts/DisplayCategory/DisplayCategory';
import DisplayItems from '../../Componesnts/DisplayItems/DisplayItems';
import CustomerForm from '../../Componesnts/CustomerForm/CustomerForm';
import CartItems from '../../Componesnts/CartItems/CartItems';
import CartSymmery from '../../Componesnts/CartSummery/CartSummery';


const Explore=()=>{

    //For cloble state passing
    const {categories}=useContext(AppContext);
  
    const [selectedcategory, setSelectedCategory] = useState("");

    return(
        <div className="explore-container text-light">
            <div className="left-column">
                <div className="first-row" style={{overflowy:'auto'}}>
                    {/* to display category we need to pass props and use AppContext to get category which we already fetch */}
                  <DisplayCategory 
                       selectedcategory={selectedcategory}
                       setSelectedCategory={setSelectedCategory}
                       categories={categories} />   
                </div>
                <hr className="horizontal line"/>
                <div className="second-row" style={{overflowy:'auto'}}>
                     <DisplayItems/>
                </div>
            </div>
            <div className="right-column d-flex flex-column ">

                <div className="customer-form-container" style={{height:'15%'}}>
                      <CustomerForm/>
                </div>
                <hr className="my-3 text-light" />
                <div className="cart-items-container"style={{height:'55%', overflowy:'auto'}}>
                      <CartItems/>
                </div>
                <hr className="my-3 text-light" />
                <div className="cart-summery-container"style={{height:'30%'}}>
                     <CartSymmery/>
                </div>

            </div>

        </div>
    )
}
export default Explore;