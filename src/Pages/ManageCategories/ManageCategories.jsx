import CategoryForm from '../../Componesnts/CategoryForm/CategoryForm';
import CategoryList from '../../Componesnts/CategoryList/CategoryList';
import './ManageCategories.css'
const ManageCategories =()=>{
    return(

        <div className="category-container text-light">
            <div className="left-column">
               <CategoryForm/>
            </div>
            <div className="right-column">
                <CategoryList/>
            </div>
        </div>

    )
}
export default ManageCategories;