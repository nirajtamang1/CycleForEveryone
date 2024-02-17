import React from "react";
import Layout from "../components/Layout/Layout";
import Banner from "../components/Layout/Banner";
import about from "../images/about.jpg";
function About() {
  return (
    <Layout title="About us - Cycle Booking System">
      <div className="container">
        <Banner />

        <section>
          <div className="container pt-5 pb-5 homeaboutus">
            <div className="row flex-column-reverse flex-md-row">
              <div className="col-md-8">
                <div style={{ textAlign: "justify" }}>
                  {/* Hero Content */}

                  <h4 className="producttitle">About US</h4>
                  <h3>Bicycles Are Our Works, But Also Our Passion</h3>
                  <p>
                    Each of us has our own challenges, goals and reasons to
                    ride. At Cycle For Everyone, our purpose is to help you
                    unleash your full potential no matter the chosen path. We do
                    this with our products, our people and the stories we share.
                    Come feel what it’s like to be limitless. Come ride with us.
                  </p>
                  <p>
                    Cycle For Everyone is the world’s leading brand of
                    high-quality bicycles and cycling gear. Part of the Cycle
                    For Everyone Group, which was founded in 1972, the brand
                    combines craftsmanship, technology and innovative design.
                  </p>
                </div>
              </div>
              <div class="col">
                <img src={about} alt="" className="w-100 h-100 rounded" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

export default About;
