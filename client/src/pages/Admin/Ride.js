import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import ReactPaginate from "react-paginate";
import toast from "react-hot-toast";

function Ride() {
  const [rides, setRides] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const ridePerPage = 5;

  useEffect(() => {
    async function featchRide() {
      try {
        const response = await axios.get(
          process.env.REACT_APP_API_URL + "/api/v1/ride/get-rides"
        );
        setRides(response.data);
      } catch (error) {
        console.error("Error fetching Rides:", error);
      }
    }

    featchRide();
  }, []);
  // console.log(rides);
  const pageCount = Math.ceil(rides.length / ridePerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const displayrides = rides
    .slice(pageNumber * ridePerPage, (pageNumber + 1) * ridePerPage)
    .map((ride) => {
      console.log(ride);
      return (
        <tr key={ride?._id}>
          <td>{ride?.product}</td>
          <td> {new Date(ride?.startTime).toLocaleString()}</td>
          <td> {new Date(ride?.endTime).toLocaleString()}</td>
          <td>{ride?.duration.toString().split(".")[0]}</td>
          <td>{ride?.price?.toString().split(".")[0]}</td>
          <td style={{ display: "flex", alignItems: "center" }}>
            <button
              onClick={() => handleDelete(ride?._id)}
              className="btn btn-danger mx-2"
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });

  const handleDelete = async (rideId) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/v1/ride//deleteRide/${rideId}`
      );
      // Update orders state after deletion
      const updatedRides = rides.filter((ride) => ride._id !== rideId);
      setRides(updatedRides);
      toast.success("Ride has been deleted");
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  return (
    <Layout title="ride- Cycle For Everyone">
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Products</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                    <th>Duration(minutes)</th>
                    <th>Price(Rs)</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>{displayrides}</tbody>
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

export default Ride;
