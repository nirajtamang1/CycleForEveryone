import React from "react";
import Layout from "../components/Layout/Layout";
import { TiMessage, TiPhoneOutline } from "react-icons/ti";
import contactus from "../images/contactus.jpg";

function Contacts() {
  return (
    <Layout title="Contact us - Booking">
      <div className="container mt-5">
        <div className="row ">
          <div className="col">
            <img
              src={contactus}
              alt="contactus images"
              style={{ width: "500px", height: "350px" }}
            />
          </div>
          <div className="col contactus">
            <h1 className="contact-title text-center">Contact Us</h1>
            <p className="text-justify mt-2">
              any quary and information about product feel here to call any time
            </p>
            <div>
              <TiMessage />:waibaniraj208@gmail.com <br />
              <TiPhoneOutline />: 9818633093
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Contacts;
