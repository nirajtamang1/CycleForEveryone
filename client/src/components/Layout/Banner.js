import React from "react";
import slider from "../../images/banner.png";
import { useNavigate } from "react-router-dom";

function Banner() {
  const navigate = useNavigate();
  return (
    <section>
      <div
        className="banner"
        style={{
          backgroundImage: `url(${slider})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "400px",
        }}
      >
        <div className="col-lg-8">
          <h1>Nepal No.1 Bike Rentals</h1>
          <p>
            There's no better way to explore Nepal than by bike. We provide a
            variety of quality bikes and accessories to do just that!
          </p>

          <button className="button" onClick={() => navigate("/product")}>
            Rent now
          </button>
        </div>
      </div>
    </section>
  );
}

export default Banner;
