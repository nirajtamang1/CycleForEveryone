import React from "react";
import contact from "../../images/contact.jpg";
import { useNavigate } from "react-router-dom";

function Contactus() {
    const navigate = useNavigate();
  return (
    <section>
      <div
        className="banner"
        style={{
          backgroundImage: `url(${contact})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "400px",
        }}
      >
        <div className="contactus">
          <h1>Get In Touch</h1>
          <p>
            Our industry-leading E-bikes are redefining what’s possible for
            cyclists of all abilities.
          </p>

          <button className="button" onClick={() => navigate("/contact")}>
            Contact us
          </button>
        </div>
      </div>
    </section>
  );
}

export default Contactus;
