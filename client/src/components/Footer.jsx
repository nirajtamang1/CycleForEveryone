import React from "react";

export default function Footer() {
  return (
    <div className="max-w-[1240px] mx-auto bg-yellow-500 grid grid-cols-3 ">
      <div>Ebike</div>
      <div>
        <h1 className="font-bold text-3xl ">Support</h1>
        <ul>
          <li>Contact</li>
          <li>Term an Policy</li>
          <li>FAQ</li>
        </ul>
      </div>
      <div>Follow us</div>
    </div>
  );
}
