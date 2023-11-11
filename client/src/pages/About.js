import React from "react";
import Layout from "../components/Layout/Layout";
import aboutus from "../images/aboutus.jpg";

function About() {
  return (
    <Layout title="About us - Ecommerce app">
      <div className="container mt-5">
        <div className="row ">
          <div className="col">
            <img
              src={aboutus}
              alt="aboutus-images"
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

export default About;
