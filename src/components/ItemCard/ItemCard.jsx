import PropTypes from "prop-types";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import {
  removeFromCart,
  increamentQty,
  decreamentQty,
} from "../../redux/slices/CartSlice";
import { toast } from "react-hot-toast";

const ItemCard = ({ id, name, price, qty, img }) => {
  const dispatch = useDispatch();
  return (
    <div className="flex gap-2 shadow-md p-2 rounded-lg mb-3">
      <MdDelete
        onClick={() => {
          dispatch(removeFromCart({ id, name, img, price, qty }));
          toast(`${name} Removed !`, {
            icon: "👋",
          });
        }}
        className="absolute right-7 text-gray-600 cursor-pointer"
      />
      <img src={img} alt="burger" className="w-[50px] h-[50px]" />
      <div className="leading-5">
        <h2 className="font-bold text-green-800">{name}</h2>
        <div className="flex justify-between">
          <span className="text-green-500 font-bold">RS:{price}</span>
          <div className="flex items-center justify-center gap-2 absolute right-7">
            <AiOutlineMinus
              onClick={() => qty > 1 && dispatch(decreamentQty({ id }))}
              className="border-2 border-gray-600 p-1 text-gray-600 hover:text-gray-100 hover:bg-green-500 hover:border-none rounded-md text-xl transition-all ease-linear cursor-pointer"
            />
            <span>{qty}</span>
            <AiOutlinePlus
              onClick={() => qty >= 1 && dispatch(increamentQty({ id }))}
              className="border-2 border-gray-600 p-1 text-gray-600 hover:text-gray-100 hover:bg-green-500 hover:border-none rounded-md text-xl transition-all ease-linear cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

ItemCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  qty: PropTypes.number.isRequired,
  img: PropTypes.string.isRequired,
};

export default ItemCard;
