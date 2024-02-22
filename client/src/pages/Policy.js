import React from "react";
import policy from "../images/privacy.jpg";
import Layout from "../components/Layout/Layout";

function Policy() {
  return (
    <Layout title="Privacy Policy - Cycle Booking System">
      <div className="container mt-2 d-flex justify-content-center align-item-center">
        <div className="row">
          <div className="col-md-6">
            <img src={policy} alt="policy-images" style={{ width: "100%" }} />
          </div>
          <div className="col-md-6 mt-2 text-justify">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet,
              minus exercitationem ab blanditiis ducimus rem quibusdam. Quod
              eaque officiis modi commodi, iure omnis perferendis. Lorem ipsum
              dolor,
            </p>
            <p>
              sit amet consectetur adipisicing elit. Assumenda quidem
              repellendus eius laborum, nulla eos eveniet perspiciatis
              cupiditate soluta minima.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Policy;
