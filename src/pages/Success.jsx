import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PropagateLoader } from "react-spinners";

const Success = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  return (
    <div className="flex flex-col items-center justify-center text-center h-screen">
      {loading ? (
        <PropagateLoader color="#36d7b7" />
      ) : (
        <div>
          <h2 className="text-3xl font-semibold mb-4">Order Successfull!</h2>
          <p className="mb-4">Your order has been successfully placed.</p>
          <Link
            to="/"
            className="flex items-center justify-center hover:underline"
          >
            Go Back
          </Link>
        </div>
      )}
    </div>
  );
};

export default Success;
