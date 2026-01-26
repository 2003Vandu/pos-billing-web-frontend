import { useContext } from 'react';
import './Explore.css';
import { AppContext } from '../../Context/Appcontext';
const Explore=()=>{
    const {categories}=useContext(AppContext);

    return(
        <div className="explore-container text-light">
            <div className="left-column">
                <div className="first-row" style={{overflowy:'auto'}}>
                  categories    
                </div>
                <hr className="horizontal line"/>
                <div className="second-row" style={{overflowy:'auto'}}>
                     items
                </div>


            </div>
            <div className="right-column d-flex flex-column ">

                <div className="customer-form-container" style={{height:'15%'}}>
                      customer form
                </div>
                <hr className="my-3 text-light" />
                <div className="cart-items-container"style={{height:'55%', overflowy:'auto'}}>
                      cart Items
                </div>
                <hr className="my-3 text-light" />
                <div className="cart-summery-container"style={{height:'30%'}}>
                     cart Summery
                </div>

            </div>

        </div>
    )
}
export default Explore;