import React from "react";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
function CartPage() {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [auth] = useAuth();
  //total Pirce
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
  return (
    <Layout title="Booking app - Cart">
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
            {cart?.map((p) => (
              <div className="row mb-2 card flex-row">
                <div className="col-md-4">
                  <img
                    className="card-img-top"
                    src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                    alt={p.name}
                    width="100px"
                    height="100px"
                  />
                </div>
                <div className="col-md-8">
                  <p>{p.name}</p>
                  <p>{p.description.substring(0, 30)}</p>
                  <h4>Price: {p.price}</h4>
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
          <div className="col-md-4 text-center">
            <h4>Cart Summary</h4>
            <p>Total Checkout Payment</p>
            <hr />
            <h4>Total Price: {totalPrice()}</h4>

            {auth?.user?.address ? (
              <>
                <div className="mb-3">
                  <h3>Current Address</h3>
                  <h4>{auth?.user?.address}</h4>
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                </div>
              </>
            ) : (
              <div className="mb-3">
                <button
                  className="btn btn-outline-warning"
                  onClick={() =>
                    navigate("/login", {
                      state: "/cart",
                    })
                  }
                >
                  Please Login to checkout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CartPage;
