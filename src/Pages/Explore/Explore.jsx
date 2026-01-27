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

    {/** we nee to use state to capture Customer Name and Number */}
    const [custemerName, setCustomerName] = useState("")
    const [mobileNumber, setMobileNumber] = useState("");
    return(
        <div className="explore-container text-light d-flex flex-column flex-lg-row">
      {/* Left column */}
      <div className="left-column flex-grow-1">
        <div className="first-row" style={{ overflowY: 'auto' }}>

                    {/* to display category we need to pass props and use AppContext to get category which we already fetch */}
                  <DisplayCategory 
                       selectedcategory={selectedcategory}
                       setSelectedCategory={setSelectedCategory}
                       categories={categories} />   
                </div>
                <hr className="horizontal line"/>
                <div className="second-row" style={{ overflowY: 'auto' }}>
                     <DisplayItems selectedcategory={selectedcategory}/>
                </div>
            </div>
            {/* Right column */}
               <div className="right-column d-flex flex-column flex-grow-4 ">
               <div className="customer-form-container" style={{ height: '15%' }}>
                      <CustomerForm
                      // we nee to pass the customer props 
                      custemerName={custemerName}
                      mobileNumber={mobileNumber}
                      setCustomerName={setCustomerName}
                      setMobileNumber={setMobileNumber}
                      />
                </div>
                <hr className="my-5 text-light" />
                <div className="cart-items-container"style={{height:'52%', overflowy:'auto'}}>
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