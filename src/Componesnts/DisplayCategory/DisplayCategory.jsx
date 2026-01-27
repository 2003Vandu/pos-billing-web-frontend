import './DisplayCategory.css'
import Category from "../Category/Category.jsx"

{/** Hear We Accept a props and we DeStructured this => {categories}  */}
const DisplayCategory = ({categories, selectedcategory, setSelectedCategory}) =>{
    return(
        
        <div className="row g-3" style={{width:'100', margin:'0'}}>

            {categories.map(category =>(
                <div key={categories.categoryId} className="col-12 col-sm-6 col-md-3" style={{padding:'0 10px'}}>
                    <Category
                    categoryName={category.name}
                    imgUrl={category.imgUrl}
                    numberOfItems={category.items}
                    bgColor={category.bgColor}

                    isSelected={selectedcategory === category.categoryId}
                    
                    onClick={() => setSelectedCategory(category.categoryId)}
                    />
                </div>
            ))}

        </div>
    )
}
export default DisplayCategory;