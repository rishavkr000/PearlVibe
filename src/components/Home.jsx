import CardList from "./CardList";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import axios from "axios";
import { useState, useEffect } from "react";
import { addProduct } from "../redux/productSlice";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [checking, setChecking] = useState(true);
  const products = useSelector((store) => store.product.productItems)

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!user) {
        navigate("/login");
      }
      setChecking(false);
    }, 100);

    return () => clearTimeout(timeout);
  }, [user, navigate]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          import.meta.env.VITE_BACKEND_URL + "/product",
          {
            withCredentials: true,
          }
        );
        dispatch(addProduct(res?.data?.data))
      } catch (err) {
        console.log("Error fetching products:", err.message);
      }
    };

    if(products.length == 0) {
      fetchProducts();
    }
  }, [dispatch, products.length]);

  return (
    <div>
      <CardList data={products} buttonType="Add" />
    </div>
  );
};

export default Home;
