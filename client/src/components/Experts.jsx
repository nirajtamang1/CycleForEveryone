import React from "react";
import cycle from "../assets/img/cycle1.jpg";

export default function Experts() {
  return (
    <div className="max-w-[1240px] mx-auto my-[10px] md:h-[250px] md:grid grid-cols-3">
      <div className="h-[250px] col-span-1 md:w-[80%] text-center">
        <img src={cycle} alt="" className="h-full inline" />
      </div>
      <div className="h-[250px] col-span-2 flex flex-col justify-center p-10">
        <h1>Learn More about cycle</h1>
        <p className="text-justify">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere libero
          corporis voluptate in voluptates. Dolor numquam debitis distinctio
          aperiam iusto iure maiores dolore, est aliquid ab nostrum fugiat.
          Assumenda, excepturi.
        </p>
        <button className="w-[30%] bg-black text-white p-3 rounded">
          Get Started
        </button>
      </div>
    </div>
  );
}
