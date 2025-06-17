import CardList from "./CardList";
import products from "../constant/cardData.json";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();
  const user = useSelector(state => state.user);
  console.log(user);
  if(!user) {
    navigate("/login")
  }
  return (
    <div>
      <CardList data={products} buttonType="Add" />
    </div>
  );
};

export default Home;
