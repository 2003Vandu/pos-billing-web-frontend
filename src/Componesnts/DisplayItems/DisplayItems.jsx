import { useContext, useState } from 'react';
import './DisplayItems.css'
import { AppContext } from '../../Context/Appcontext';
import Item from '../Item/Item';
import SearchBar from '../SearchBar/SearchBar.';

const DisplayItems = () => {
      
      {/** we use a globel state for item from Appcontext */}
      const { itemsData } = useContext(AppContext);

      {/** we can use searchText to search the item in the item list  */}
      const [searchText, setSearchText]= useState("");

      const filteredItems = itemsData.filter(item =>{
            return item.name.toLowerCase().includes(searchText.toLowerCase);
      })

  return (
    <div className="p-3">
      <div className="d-flex justify-content-between align-itens-center align-items-center mb-4">
            <div></div>
            <div>
              <SearchBar onSearch={setSearchText} />
            </div>
      </div>
      <div className="row g-3">
        {itemsData && itemsData.map((item, index) => (
          <div key={item.itemId || index} className="col-md-4 col-sm-6">
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