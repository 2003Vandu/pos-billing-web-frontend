import ItemForm from '../../Componesnts/ItemForm/ItemForm';
import ItemList from '../../Componesnts/ItemList/Itemlist';
import './Manageitems.css';
const Manageitem =()=>{
    return(
        <div className="items-container text-light">
            <div className="left-column">
                <ItemForm/>
            </div>
            <div className="right-column">
                <ItemList/>
            </div>
        </div>
    )
}
export default Manageitem;