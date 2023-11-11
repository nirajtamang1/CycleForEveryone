import React from "react";
import policy from "../images/privacy.jpg";
import Layout from "../components/Layout/Layout";

function Policy() {
  return (
    
    <Layout title="Privacy Policy - Ecommerce app">
      <div className="container mt-5">
        <div className="row ">
          <div className="col">
            <img
              src={policy}
              alt="policy-images"
              style={{ width: "500px", height: "350px" }}
            />
          </div>
          <div className="col mt-5 text-justify">
            <p className="mt-5">
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
