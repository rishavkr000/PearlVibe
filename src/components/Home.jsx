import CardList from "./CardList";
import products from "../constant/cardData.json";

const Home = () => {
  return (
    <div>
      <CardList data={products} buttonType="Add" />
    </div>
  );
};

export default Home;
