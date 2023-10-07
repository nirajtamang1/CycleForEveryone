import React from "react";
import cycle from "../assets/img/cycle1.jpg";

export default function Rent() {
  return (
    <div className="max-w-[1240px] mx-auto my-[10px]">
      <h1 className="text-[25px] font-bold">Rent a Cycle</h1>
      <div className="md:grid grid-cols-3 gap-6 gap-y-6 mt-10">
        <div className="shadow-xl hover:scale-105 duration-300">
          <img
            src={cycle}
            alt="cycle for images"
            className="h-[200px] w-full border-3xl"
          />
          <button className="bg-[#50d71e] px-5 py-3px rounded-2xl text-white mt-5 hover:shadow-lg">
            Avaiable
          </button>
          <h2 className="font-bold text-3xl">Cycle Name</h2>
          <p>Per hour: Rs 40</p>
        </div>
        <div className="shadow-xl hover:scale-105 duration-300">
          <img
            src={cycle}
            alt="cycle for images"
            className="h-[200px] w-full border-3xl"
          />
          <button className="bg-[#50d71e] px-5 py-3px rounded-2xl text-white mt-5 hover:shadow-lg">
            Avaiable
          </button>
          <h2 className="font-bold text-3xl">Cycle Name</h2>
          <p>Per hour: Rs 40</p>
        </div>
        <div className="shadow-xl hover:scale-105 duration-300">
          <img
            src={cycle}
            alt="cycle for images"
            className="h-[200px] w-full border-3xl"
          />
          <button className="bg-[#50d71e] px-5 py-3px rounded-2xl text-white mt-5 hover:shadow-lg">
            Avaiable
          </button>
          <h2 className="font-bold text-3xl">Cycle Name</h2>
          <p>Per hour: Rs 40</p>
        </div>
        <div className="shadow-xl hover:scale-105 duration-300">
          <img
            src={cycle}
            alt="cycle for images"
            className="h-[200px] w-full border-3xl"
          />
          <button className="bg-[#50d71e] px-5 py-3px rounded-2xl text-white mt-5 hover:shadow-lg">
            Avaiable
          </button>
          <h2 className="font-bold text-3xl">Cycle Name</h2>
          <p>Per hour: Rs 40</p>
        </div>
        <div className="shadow-xl hover:scale-105 duration-300">
          <img
            src={cycle}
            alt="cycle for images"
            className="h-[200px] w-full border-3xl"
          />
          <button className="bg-[#50d71e] px-5 py-3px rounded-2xl text-white mt-5 hover:shadow-lg">
            Avaiable
          </button>
          <h2 className="font-bold text-3xl">Cycle Name</h2>
          <p>Per hour: Rs 40</p>
        </div>
        <div className="shadow-xl hover:scale-105 duration-300">
          <img
            src={cycle}
            alt="cycle for images"
            className="h-[200px] w-full border-3xl"
          />
          <button className="bg-[#50d71e] px-5 py-3px rounded-2xl text-white mt-5 hover:shadow-lg">
            Avaiable
          </button>
          <h2 className="font-bold text-3xl">Cycle Name</h2>
          <p>Per hour: Rs 40</p>
        </div>
      </div>
    </div>
  );
}
