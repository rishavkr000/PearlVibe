import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../redux/userSlice";
import { useNavigate } from "react-router";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const fetchUser = async () => {
    try {
      const res = await axios.get(
        import.meta.env.VITE_BACKEND_URL + "/profile/view",
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUser();
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Body;
