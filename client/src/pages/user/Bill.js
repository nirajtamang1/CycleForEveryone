import React from "react";
import html2canvas from "html2canvas";
import toast from "react-hot-toast";
import logo from "../../images/logos.png";

function Bill({ order }) {
  const handleDownloadOrder = () => {
    // Convert order HTML to image using html2canvas
    const orderContainer = document.getElementById(
      `order-container-${order._id}`
    );

    if (!orderContainer) {
      console.error(`Order container with ID ${order._id} not found.`);
      return;
    }

    orderContainer.style.display = "block";

    html2canvas(orderContainer).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "order.png";
      link.click();
    });

    toast.success("Order.png downloaded successfully");
    orderContainer.style.display = "none";
  };

  return (
    <div>
      <button onClick={handleDownloadOrder} className="btngreenColor">
        Download Bill
      </button>
      <div
        id={`order-container-${order._id}`}
        style={{ display: "none", width: "60vh", height: "auto" }}
      >
        <img
          className="logo"
          src={logo}
          alt="logo of comapany"
          style={{ width: 150 }}
        />
        <h1>Bill</h1>
        <h5>Name: {order.username}</h5>
        <h2>Products Details</h2>

        <table className="table table-striped">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Duration</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {console.log(order)}
            {order?.products.map((product, index) => (
              <tr key={index}>
                <td>{product.name}</td>
                <td>{product.selectedDateTime.split(",")[0]}</td>
                <td>{product.selectedDateTime.split(",")[1]}</td>
                <td>{product.duration}</td>
                <td>Rs. {product.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h5 className="total-amount">Total Amount: Rs. {order.payment}</h5>
      </div>
    </div>
  );
}

export default Bill;
