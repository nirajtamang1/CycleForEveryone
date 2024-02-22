import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import ReactPaginate from "react-paginate";
import toast from "react-hot-toast";
import Bill from "../user/Bill";

function OrderInfo() {
  const [orders, setOrders] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const ordersPerPage = 5;

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await axios.get( process.env.REACT_APP_API_URL +"/api/v1/order/getAllOrder");
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    }

    fetchOrders();
  }, []);

  const pageCount = Math.ceil(orders.length / ordersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const displayOrders = orders
    .slice(pageNumber * ordersPerPage, (pageNumber + 1) * ordersPerPage)
    .map((order) => (
      <tr key={order._id}>
        <td>{order.username}</td>
        <td>{order.payment}</td>
        <td>
          <ul>
            {order?.products.map((product, index) => (
              <tr key={index}>
                <td>{product.name}</td>
                <td style={{ paddingLeft: "10px" }}>Rs. {product.price}</td>
              </tr>
            ))}
          </ul>
        </td>
        <td style={{ display: "flex", alignItems: "center" }}>
          <Bill order={order} />
          <button
            onClick={() => handleDelete(order._id)}
            className="btn btn-danger mx-2"
          >
            Delete
          </button>
        </td>
      </tr>
    ));

  const handleDelete = async (orderId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/v1/order/deleteOrder/${orderId}`);
      // Update orders state after deletion
      const updatedOrders = orders.filter((order) => order._id !== orderId);
      setOrders(updatedOrders);
      toast.success("Order has been deleted");
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  return (
    <Layout title="Order- Cycle For Everyone">
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="table-responsive">
              <table className="table table-bordered">
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

export default OrderInfo;
