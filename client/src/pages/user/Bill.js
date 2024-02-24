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
      <div id={`order-container-${order._id}`} style={{ display: "none" }}>
        <img
          className="logo"
          src={logo}
          alt="logo of comapany"
          style={{ width: 150 }}
        />
        <h1>Order Details</h1>
        <p>Name: {order.username}</p>
        <h2>Products:</h2>
        <ul>
          {order?.products.map((product, index) => (
            <tr key={index}>
              <td>{product.name}</td>
              <td style={{ paddingLeft: "10px" }}>{product.price}</td>
            </tr>
          ))}
        </ul>
        <p>Total Amount: Rs. {order.payment}</p>
      </div>
    </div>
  );
}

export default Bill;
