import './DisplayCategory.css'
import Category from "../Category/Category.jsx"
import profile from "../../assets/profile.png";



{/** Hear We Accept a props and we DeStructured this => {categories}  */}
const DisplayCategory = ({categories, selectedcategory, setSelectedCategory}) =>{
    return(
        
        <div className="row g-3" style={{width:'100', margin:'0'}}>
           <div key="all items" className="col-12 col-sm-6 col-md-3" style={{padding:'0 10px'}}>

            <Category
                    categoryName="All items "
                    imgUrl={profile}
                    numberOfItems={categories.reduce((acc, cat)=> acc + cat.items,0)}
                    bgColor="#6c757d"
                    isSelected={selectedcategory === ""} 
                    onClick={() => setSelectedCategory("")}
                    />
            </div>
            {categories.map(category =>(
                <div key={category.categoryId || category.name} className="col-12 col-sm-6 col-md-3" style={{padding:'0 10px'}}>
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