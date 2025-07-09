import CardList from "./CardList";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import axios from "axios";
import { useState, useEffect } from "react";

const Home = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [products, setProducts] = useState([]);
  const [setChecking] = useState(true);
  console.log(user);

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
        setProducts(res?.data?.data || []);
      } catch (err) {
        console.log("Error fetching products:", err.message);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <CardList data={products} buttonType="Add" />
    </div>
  );
};

export default Home;
