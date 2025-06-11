import { useDispatch } from "react-redux";
import products from "../constant/cardData.json";
import { addProduct } from "../redux/productSlice.jsx";

const Card = () => {
  const dispatch = useDispatch();
  const handleAddToCart = (product) => {
    dispatch(addProduct(product));
  };
  return (
    <div className="p-2 flex flex-wrap">
      {products.map((product, index) => (
        <div key={index} className="card bg-base-100 w-94 shadow-sm my-5">
          <figure>
            <img src={product.img} alt={product.name} className="w-85 h-40" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{product.name}</h2>
            <p>{product.description}</p>
            <p>₹ {product.price}</p>
            <div className="card-actions justify-end">
              <button
                className="btn btn-primary"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
