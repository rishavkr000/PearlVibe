import { useDispatch } from "react-redux";
import { addProduct, removeItem } from "../redux/productSlice.jsx";
import { useState } from "react";

const CardList = ({ data, buttonType }) => {
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState(null);
  const handleAddToCart = (product) => {
    dispatch(addProduct(product));
  };
  const handleRemoveFromCart = (index) => {
    dispatch(removeItem(index));
  };
  const handleImageClick = (img) => {
    setSelectedImage(img);
    document.getElementById("image_modal").showModal();
  };
  return (
    <>
      <div className="p-2 flex flex-wrap">
        {data.map((product, index) => (
          <div
            key={index}
            className="card bg-base-100 w-120 shadow-sm my-5 mx-auto"
          >
            <figure>
              <img
                src={product.img}
                alt={product.name}
                className="w-110 h-60 rounded-2xl cursor-pointer"
                onClick={() => handleImageClick(product.img)}
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{product.name}</h2>
              <p>{product.description}</p>
              <p>₹ {product.price}</p>
              <div className="card-actions justify-end">
                {buttonType == "Add" ? (
                  <button
                    className="btn btn-primary"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                ) : (
                  <button
                    className="btn btn-primary"
                    onClick={() => handleRemoveFromCart(index)}
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <dialog id="image_modal" className="modal">
        <div className="modal-box max-w-4xl p-4">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4">
              ✕
            </button>
          </form>
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Zoomed View"
              className="w-full h-auto object-contain rounded-xl"
            />
          )}
        </div>
      </dialog>
    </>
  );
};

export default CardList;
