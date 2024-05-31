import React from "react";
import HomeNavbar from "./components/HomeNavbar";
import backgroundImage from "../../assets/hrbg.jpg";

export default function Home() {
  return (
    <div>
      <div className="-z-[99999] fixed">
        <img
          className="w-screen h-screen -z-50"
          src={backgroundImage}
          alt="background"
        />
      </div>
      <HomeNavbar />
    </div>
  );
}
