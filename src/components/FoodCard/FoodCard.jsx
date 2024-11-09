import PropTypes from "prop-types";
import { AiFillStar } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/CartSlice";

const FoodCard = ({ id, name, price, desc, img, rating, handleToast }) => {
  const dispatch = useDispatch();
  return (
    <div className="card">
      <img
        src={img}
        alt="burger pic"
        className="w-auto h-[130px] hover:scale-110 cursor-grab transition-all duration-500 ease-in-out"
      />
      <div className="text-sm flex items-center justify-between">
        <h2>{name}</h2>
        <span className="text-secondary-800 dark:text-secondary-300">
          Rs:{price}
        </span>
      </div>
      <p className="text-sm font-normal">{desc.slice(0, 50)}...</p>
      <div className="flex justify-between">
        <span className="flex items-center justify-center">
          <AiFillStar className="mr-1 text-primary-500" />
          {rating}
        </span>
        <button
          onClick={() => {
            handleToast(name);
            dispatch(addToCart({ id, name, price, rating, img, qty: 1 }));
          }}
          className="btn2"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

FoodCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  desc: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  handleToast: PropTypes.func.isRequired,
};

export default FoodCard;
