import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { useCart } from "../../context/cart";
import toast from "react-hot-toast";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import paymentSuccessful from "../../images/payment.gif";

const EsewaSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const pId = uuidv4();

  const params = new URLSearchParams(location.search);
  const oid = params.get("oid");
  const amt = params.get("amt");
  const refID = params.get("refId");

  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total;
    } catch (error) {
      console.log(error);
    }
  };
  const handleCashPayment = async () => {
    try {
      console.log(auth);
      const username = auth?.user?.name;
      const email = auth?.user?.email;
      const response = await axios.post(
        process.env.REACT_APP_API_URL + "/api/v1/product/booking",
        {
          orderId: pId,
          totalAmount: totalPrice(),
          cart: cart,
          username: username,
          email: email,
        }
      );
      if (response.data.success) {
        // API call was successful
        // console.log("Cash payment successful.");
        toast.success("Booked successful");
        localStorage.removeItem("cart");
        setCart([]);

        navigate("/dashboard/user/orders");
      } else {
        console.error("Cash payment failed.");
      }
    } catch (error) {
      console.error("Error making cash payment API call:", error);
    }
  };

  useEffect(() => {
    const redirectTimeout = setTimeout(() => {
      if (oid && amt && refID) {
        handleCashPayment();
      }
    }, 5000);
    return () => clearTimeout(redirectTimeout);
  });

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      {oid && amt && refID && (
        <div>
          <img src={paymentSuccessful} alt="Payment Successful image" />
        </div>
      )}
    </div>
  );
};

export default EsewaSuccess;
