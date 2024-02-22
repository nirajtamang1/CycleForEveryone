import React from "react";
import Layout from "../components/Layout/Layout";
import { TiMessage, TiPhoneOutline } from "react-icons/ti";
import contact from "../images/contact.jpg";

function Contacts() {
  return (
    <Layout title="Contact us - Cycle Booking System">
      <div className="container mt-5 img-fluid">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.168000396863!2d85.32819117582787!3d27.712098725281255!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb196de5da5741%3A0x652792640c70ede9!2sHerald%20College%20Kathmandu!5e0!3m2!1sen!2snp!4v1707773127004!5m2!1sen!2snp"
          style={{
            width: "100%",
            height: "500px",
            border: "0",
          }}
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
        <div className="row">
          <div className="col-md-6">
            <img src={contact} alt="contact us Images" className="img-fluid" />
          </div>
          <div className="col-md-6 d-md-flex flex-md-column justify-content-center align-items-start">
            <h2>Contact Info</h2>
            <p className="text-justify mt-2">
              At Cycle For Everyone, we strongly believe that your online bike
              shop should be the hub for your everyday bicycling needs. Your
              local authorized Cycle For Everyone retailer should be able to
              provide the best services for you and your bicycle.
            </p>
            <div>
              <TiMessage />: CycleForEveryone@gmail.com <br />
              <TiPhoneOutline />: 9818633093
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Contacts;
