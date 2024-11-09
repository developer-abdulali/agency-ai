import { useEffect, useState } from "react";
import FoodData from "../../Data/FoodData";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../../redux/slices/CategorySlice";

const CategoryMenu = () => {
  const [categories, setCategories] = useState([]);

  const listUniqueCategories = () => {
    const uniqueCategories = [
      ...new Set(FoodData.map((food) => food.category)),
    ];
    setCategories(uniqueCategories);
  };

  useEffect(() => {
    listUniqueCategories();
  }, []);
  const dispatch = useDispatch();
  const selectedCategory = useSelector((state) => state.category.category);
  return (
    <div className="ml-6">
      <h3 className="text-xl font-bold">Find the best food</h3>
      <div className="w-full my-3 flex gap-3 mx-sm:py-2 max-sm:px-4 max-sm:overflow-scroll lg:overflow-x-hidden">
        <button
          onClick={() => dispatch(setCategory("All"))}
          className={` btn ${selectedCategory === "All" && "sel"}`}
        >
          All
        </button>
        {categories.map((category, index) => {
          return (
            <button
              onClick={() => dispatch(setCategory(category))}
              key={index}
              className={`btn ${selectedCategory === category && "sel"}`}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryMenu;
