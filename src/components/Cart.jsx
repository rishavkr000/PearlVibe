import { useSelector } from "react-redux";
import CardList from "./CardList";
import { useNavigate } from "react-router";

const Cart = () => {
  const products = useSelector((store) => store.product.productItems);
  const navigate = useNavigate();

  const handleAddItems = () => {
    navigate("/");
  };

  return products && products.length > 0 ? (
    <div>
      <CardList data={products} buttonType="Remove"/>
    </div>
  ) : (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 mt-[-80px]">
      <div className="bg-white text-black text-center p-6 rounded-lg shadow-lg">
        <img
          src="https://rukminim2.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90"
          alt="cart"
          className="w-52 mx-auto mb-4"
        />
        <h1 className="text-xl font-semibold mb-2">Your cart is empty!</h1>
        <h4 className="text-sm mb-4">Add items to it now.</h4>
        <button className="btn btn-primary" onClick={handleAddItems}>
          Add Items
        </button>
      </div>
    </div>
  );
};

export default Cart;
