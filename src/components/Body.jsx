import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router";

const Body = () => {
  return (
    <div className="">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
