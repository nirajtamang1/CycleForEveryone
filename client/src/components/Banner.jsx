import React from "react";
import Typed from "react-typed";
import cycle from "../assets/img/banner.jpg";

export default function Banner() {
  const backgroundImageStyle = {
    backgroundImage: `url(${cycle})`,
  };
  return (
    <div style={backgroundImageStyle}
      className="bg-cover bg-center w-full py-[100px] font-bold">
      {/* <img src={cycle} alt="" /> */}
      <div className="max-w-[1240px] h-[400px] mx-auto text-center">
        <div></div>
        <h2 className="text-white text-[30px] md:text-[50px]">
          Your Cycling Journey Starts Here
        </h2>
        <div className="md:text-[30px] text-[15px] text-white">
          Make a sustainable choice and explore Nepal responsibly.
          <br />
          Join our cycling community and embark on eco-friendly adventures{" "}
          <Typed
            strings={["Here you can find anything", "What ever you like"]}
            typeSpeed={50}
            loop={true}
            backSpeed={50}
          />
        </div>
        <button className="bg-[#50d71e] px-5 py-3px rounded-2xl text-white mt-5 hover:shadow-lg">
          Book Now
        </button>
      </div>
    </div>
  );
}
