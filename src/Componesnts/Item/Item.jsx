import { useContext } from 'react';
import './Item.css'
import { AppContext } from '../../Context/Appcontext';

{/** hear we accept the prop of Items from parent  >> inside this we designe a Item component */}
const Item = ({ itemName, itemprice, itemImage, itemid, stockQuantity, inStock, isLowStock }) => {
  const { addToCart } = useContext(AppContext);

  // ✅ Safe fallback: if backend hasn't sent stock fields yet, treat as in stock
  const isAvailable = inStock !== undefined ? inStock : true;
  const stock = stockQuantity !== undefined ? stockQuantity : null;
  const lowStock = isLowStock !== undefined ? isLowStock : false;

  const handlerAddToCart = () => {
    if (!isAvailable) return;
    addToCart({
      name: itemName,
      price: itemprice,
      quantity: 1,
      itemid: itemid,
      stockQuantity: stock
    });
  };

  return (
    <div className="p-3 bg-dark rounded shadow-sm h-100 d-flex flex-column flex-sm-row align-items-center item-card">
      <div style={{ position: "relative", marginRight: "15px" }}>
        <img src={itemImage} alt={itemName} className="item-image" />
      </div>
      <div className="flex-grow-1 ms-2">
        <h6 className="mb-1 text-light">{itemName}</h6>
        <p className="mb-0 fw-bold text-light">₹ {itemprice}</p>

        {/* ✅ Only show badge if backend is sending stock data */}
        {stock !== null && (
          !isAvailable ? (
            <span className="badge bg-danger mt-1">Out of Stock</span>
          ) : lowStock ? (
            <span className="badge bg-warning text-dark mt-1">Only {stock} left</span>
          ) : (
            <span className="badge bg-success mt-1">In Stock</span>
          )
        )}
      </div>
      <div className="d-flex flex-column justify-content-between align-items-center ms-3" style={{ height: "100%" }}>
        <i
          className={`bi bi-cart-plus fs-5 ${isAvailable ? 'text-warning' : 'text-secondary'}`}
          onClick={handlerAddToCart}
          style={{ cursor: isAvailable ? 'pointer' : 'not-allowed' }}
        ></i>
        <button
          className="btn btn-success btn-sm"
          onClick={handlerAddToCart}
          disabled={!isAvailable}
        >
          <i className="bi bi-plus"></i>
        </button>
      </div>
    </div>
  );
};
export default Item;