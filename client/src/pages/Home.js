import React from "react";
import Layout from "../components/Layout/Layout";
import aboutus from "../images/aboutus.jpg";
import contactus from "../images/contactus.jpg";
import privacy from "../images/privacy.jpg";
import { Link } from "react-router-dom";
// import AliceCarousel from "react-alice-carousel";
// import "react-alice-carousel/lib/alice-carousel.css";slider
import slider from "../images/slider.jpg";

function Home() {
  // const handleDragStart = (e) => e.preventDefault();

  // const items = [
  //   <img src={aboutus} onDragStart={handleDragStart} role="presentation" />,
  //   <img src={aboutus} onDragStart={handleDragStart} role="presentation" />,
  //   <img src={aboutus} onDragStart={handleDragStart} role="presentation" />,
  // ];

  return (
    <Layout title={"Cycle For Everyone - Home Page"}>
      <div
        id="carouselExampleRide"
        className="carousel slide mt-3"
        data-bs-ride="true"
      >
        <div
          className="carousel-inner"
          style={{
            backgroundImage: `url(${slider})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="carousel-item active">
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <img
                    src={aboutus}
                    className="d-block h-100 w-100"
                    alt="..."
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <img src={contactus} className="d-block" alt="" />
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <img src={privacy} className="d-block" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleRide"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleRide"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      {/* card Section */}
      <div className="row row-cols-1 row-cols-md-3 g-4 mt-3 mb-3">
        <div className="col">
          <div className="card">
            <img src={aboutus} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
              <Link to="/homepage">Rent now</Link>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card">
            <img src={privacy} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card">
            <img src={contactus} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                This is a longer card with supporting text below as a natural
                lead-in to additional content.
              </p>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div>
        <h3>Reat a Bike</h3>

        {/* <AliceCarousel mouseTracking items={items} /> */}

        {/* <div className="container">
          <div className="row">
            <div className="card">
              <div className="card-body">

              <img src={aboutus} alt="about us Images" className="card-img-top" height="300px" />
              <br />
              <h1>Owl Carosel</h1>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </Layout>
  );
}

export default Home;
