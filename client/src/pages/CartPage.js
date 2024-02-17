import React from "react";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
function CartPage() {
  const pId = uuidv4();
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [auth] = useAuth();

  //total Price
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

  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item.id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };
  const [paymentUrl, setPaymentUrl] = useState("");

  const handleOnlinePayment = async () => {
    try {
      const response = await axios.post("/api/v1/product/payment", {
        amount: totalPrice(),
        orderId: pId,
      });
      const { path, params } = response.data;
      setPaymentUrl(path);
      const form = document.createElement("form");
      form.setAttribute("method", "POST");
      form.setAttribute("action", path);

      for (const key in params) {
        const input = document.createElement("input");
        input.setAttribute("type", "hidden");
        input.setAttribute("name", key);
        input.setAttribute("value", params[key]);
        form.appendChild(input);
      }

      document.body.appendChild(form);
      form.submit();
      form.addEventListener("submit", async () => {
        toast.success("Payment Successfull");
        try {
          await onlineBooked();
        } catch (error) {
          console.log(error);
        }
      });
    } catch (error) {
      console.error(error);
    }
  };
  const onlineBooked = async () => {
    try {
      const username = auth?.user?.name;
      await axios.post("/api/v1/product/booking", {
        orderId: pId,
        totalAmount: totalPrice(),
        cart: cart,
        username: username,
      });
      localStorage.removeItem("cart");
      setCart([]);
    } catch (error) {
      console.error("Error making cash payment API call:", error);
    }
  };

  const handleCashPayment = async () => {
    try {
      console.log(auth);
      const username = auth?.user?.name;
      const email = auth?.user?.email;
      const response = await axios.post("/api/v1/product/booking", {
        orderId: pId,
        totalAmount: totalPrice(),
        cart: cart,
        username: username,
        email: email,
      });
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

  return (
    <Layout title="Cart - Cycle Booking System">
      {console.log(auth?.user?.id)}
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {`Hello ${auth?.token && auth?.user?.name}`}
            </h1>

            <h4 className="text-center">
              {cart?.length >= 1
                ? `You have ${cart.length} item in your cart ${
                    auth?.token ? "" : "Please Login to checkout"
                  }`
                : "Your card is empty"}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            {/* {JSON.stringify(cart, null, 4)} */}
            {cart?.map((p) => (
              <div className="row p-2 card flex-row">
                <div className="col-md-4">
                  <img
                    className="card-img-top"
                    src={`/api/v1/product/product-photo/${p._id}`}
                    alt={p.name}
                    width="100px"
                  />
                </div>
                <div className="col-md-8">
                  <div>
                    <h4>{p.name}</h4>
                    <div>{p.description.substring(0, 30)}</div>
                    <div>{p?.selectedDateTime?.toLocaleString()}</div>
                    <div>{p.duration}</div>
                    <h4>Price: {p.price}</h4>
                  </div>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeCartItem(p._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Cart Summary</h5>
                <p className="card-text">Total Checkout Payment</p>
                <hr />
                <h5 className="card-text">Total Price: {totalPrice()}</h5>
                {auth?.user?.address ? (
                  <>
                    <button
                      className="btn btn-primary mt-3 w-100"
                      onClick={handleCashPayment}
                    >
                      Cash Payment
                    </button>
                    <button
                      className="btn btn-primary mt-3 w-100"
                      onClick={handleOnlinePayment}
                    >
                      Online Payment
                    </button>
                  </>
                ) : (
                  <button
                    className="btn btn-warning w-100"
                    onClick={() =>
                      navigate("/login", {
                        state: "/cart",
                      })
                    }
                  >
                    Please Login to checkout
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CartPage;
