import React from "react";
import cycle from "../assets/img/cycle1.jpg";

export default function Plans() {
  return (
    <div className="max-w-[1240px] mx-auto my-[10px]  gap-y-6 md:grid grid-cols-3 gap-6 mt-10">
      <div className="shadow-xl col-span-1 hover:scale-105 duration-300">
        <img
          src={cycle}
          alt="cycle for images"
          className="h-[200px] w-full border-3xl"
        />
        <h2 className="font-bold text-3xl">Rent a cycle</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo,
          asperiores odio. repellendus unde!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum
          architecto officiis earum!
        </p>
        <button className="bg-[#50d71e] px-5 py-3px rounded-2xl text-white mt-5 hover:shadow-lg">
          Learn More
        </button>
      </div>
      <div className="shadow-xl col-span-1 hover:scale-105 duration-300">
        <img
          src={cycle}
          alt="cycle for images"
          className="h-[200px] w-full border-3xl"
        />
        <h2 className="font-bold text-3xl">Self Guide Tour</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo,
          asperiores odio. repellendus unde!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum
          architecto officiis earum!
        </p>
        <button className="bg-[#50d71e] px-5 py-3px rounded-2xl text-white mt-5 hover:shadow-lg">
          Learn More
        </button>
      </div>
      <div className="shadow-xl  col-span-1 hover:scale-105 duration-300">
        <img
          src={cycle}
          alt="cycle for images"
          className="h-[200px] w-full border-3xl"
        />
        <h2 className="font-bold text-3xl">Team Bonding Events</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo,
          asperiores odio. repellendus unde!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum
          architecto officiis earum!
        </p>
        <button className="bg-[#50d71e] px-5 py-3px rounded-2xl text-white mt-5 hover:shadow-lg">
          Learn More
        </button>
      </div>
    </div>
  );
}
