import Navbar from "../components/Navbar/Navbar";
import CategoryMenu from "../components/CategoryMenu/CategoryMenu";
import FoodItems from "../components/FoodItems/FoodItems";
import Cart from "../components/Cart/Cart";

const Home = () => {
  return (
    <div>
      <Navbar />
      <CategoryMenu />
      <FoodItems />
      <Cart />
    </div>
  );
};

export default Home;
