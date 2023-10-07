import React from "react";

export default function Newlatter() {
  return (
    <div className="bg-[#50d71e] p-4">
      <div className="max-w-[1240px] mx-auto md:flex justify-between">
        <div className="md:h-[300px] w-[70%]">
          <h1 className="text-[40px] text-white font-bold">Want to learn</h1>
          <span className="text-white">Lorem, ipsum dolor.</span>
        </div>
        <div className="md:h-[300px]">
          <input type="text" />
          <button className="bg-black text-white rounded">Get Started</button>
          <br />
          <p className="text-white">
            Lorem ipsum dolor sit amet consectetur adipisicing.
          </p>
        </div>
      </div>
    </div>
  );
}
