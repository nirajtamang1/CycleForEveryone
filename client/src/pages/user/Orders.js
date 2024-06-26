import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import ReactPaginate from "react-paginate";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";
import UsersMenu from "../../components/Layout/UserMenu";
import Bill from "./Bill";

function Orders() {
  const [auth] = useAuth();
  const [orders, setOrders] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const ordersPerPage = 5;

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await axios.get(
          process.env.REACT_APP_API_URL + "/api/v1/order/getAllOrder"
        );
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    }

    fetchOrders();
  }, []);
  const usernames = orders.map((order) => order.email);

  const filteredOrders = orders.filter((order) => {
    return auth?.user?.email === order.email;
  });

  const pageCount = Math.ceil(filteredOrders.length / ordersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const displayOrders = filteredOrders
    .slice(pageNumber * ordersPerPage, (pageNumber + 1) * ordersPerPage)
    .map((order) => (
      <tr key={order._id}>
        <td>{order.username}</td>
        <td>{order.payment}</td>

        <td>
          <ul>
            {order.products.map((product, index) => (
              <li key={index}>
                Name: {product.name}, Price: {product.price}, Duration:{" "}
                {product.duration}, data:
                {product.selectedDateTime}
              </li>
            ))}
          </ul>
        </td>
        <td>
          <Bill order={order} />
          <button
            onClick={() => handleDelete(order._id)}
            className="btn btn-danger my-2"
          >
            Delete
          </button>
        </td>
      </tr>
    ));

  const handleDelete = async (orderId) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/v1/order/deleteOrder/${orderId}`
      );
      // Update orders state after deletion
      const updatedOrders = orders.filter((order) => order._id !== orderId);
      setOrders(updatedOrders);
      toast.success("Order has been deleted");
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  return (
    <Layout title="Order -Cycle For Everyone">
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-3">
            <UsersMenu />
          </div>
          <div className="col-md-9">
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Payment</th>
                    <th>Products</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>{displayOrders}</tbody>
              </table>
            </div>
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName={"pagination"}
              previousLinkClassName={"pagination__link"}
              nextLinkClassName={"pagination__link"}
              disabledClassName={"pagination__link--disabled"}
              activeClassName={"pagination__link--active"}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Orders;
