import { useContext, useState } from 'react';
import './DisplayItems.css'
import { AppContext } from '../../Context/Appcontext';
import Item from '../Item/Item';
import SearchBar from '../SearchBar/SearchBar';

const DisplayItems = ({selectedcategory}) => {
      
      {/** we use a globel state for item from Appcontext */}
      const { itemsData } = useContext(AppContext);

      {/** we can use searchText to search the item in the item list  */}
      const [searchText, setSearchText]= useState("");

      // hear we make it function like when wwe select a category in explore it will 
      // filter that category item
      const filteredItems = itemsData.filter(item =>{
            if(!selectedcategory) return true;
            return item.categoryId === selectedcategory;
      }).filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()));

  return (
    <div className="p-3">
      <div className="d-flex justify-content-between align-itens-center align-items-center mb-4">
            <div></div>
            <div>
              <SearchBar onSearch={setSearchText} />
            </div>
      </div>
      <div className="row g-3">
        {filteredItems && filteredItems.map((item, index) => (
          <div key={item.itemId || index} className="col-12 col-sm-6 col-md-4">
            <Item
              itemName={item.name}
              itemprice={item.price}
              itemImage={item.imgUrl}
              itemid={item.itemId}
            />
          </div>
        ))}
      </div>
    </div>

      );
};
export default DisplayItems;