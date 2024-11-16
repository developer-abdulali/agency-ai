import { useState } from "react";
import { VscChromeClose } from "react-icons/vsc";
import ItemCard from "../ItemCard/ItemCard";
import { useSelector } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [activeCart, setActiveCart] = useState(false);
  const cartItems = useSelector((state) => state.cart.cart);
  const totalQty = cartItems.reduce((totalQty, item) => totalQty + item.qty, 0);
  const navigate = useNavigate();
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.qty * item.price,
    0,
  );
  return (
    <>
      <div
        className={`bg-gray-300 text-gray-800 dark:bg-secondary-700 dark:text-secondary-300 fixed top-0 right-0 p-5 w-full h-full lg:w-[20vw] transition-all duration-500 z-50 ${activeCart ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex justify-between items-center my-2">
          <span className="text-xl font-bold">My Orders</span>
          <VscChromeClose
            onClick={() => setActiveCart(!activeCart)}
            className="border-2 border-secondary-500 dark:border-secondary-600 text-gray-800 dark:text-gray-300 font-bold p-1 text-2xl rounded-md hover:text-gray-900 dark:hover:text-gray-200 hover:border-secondary-600 dark:hover:border-secondary-500 cursor-pointer"
          />
        </div>
        {cartItems.length ? (
          cartItems.map((food) => {
            return (
              <ItemCard
                key={food.id}
                id={food.id}
                name={food.name}
                price={food.price}
                img={food.img}
                qty={food.qty}
              />
            );
          })
        ) : (
          <h2 className="text-center font-bold text-xl">Your Cart is empty</h2>
        )}

        <div className="absolute bottom-0">
          <h3 className="font-bold">Items : {totalQty}</h3>
          <h3 className="font-bold">Total Amount : {totalPrice}</h3>
          <hr className="my-2 w-[90vw] lg:w-[18vw]" />
          <button
            onClick={() => navigate("/success")}
            className="btn2 w-[90vw] lg:w-[18vw] mb-2"
          >
            Checkout
          </button>
        </div>
      </div>
      <FaShoppingCart
        onClick={() => setActiveCart(!activeCart)}
        className={`rounded-full bg-secondary-300 text-secondary-900 dark:bg-secondary-800 dark:text-secondary-100 text-5xl shadow-md p-3 fixed bottom-4 right-4 cursor-pointer hover:bg-secondary-400 dark:hover:bg-secondary-700 duration-300 ${totalQty > 0 && "animate-bounce delay-500 transition-all"}`}
      />
    </>
  );
};

export default Cart;
