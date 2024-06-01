import { useState } from "react";
import back from "./assets/back.png";
import "./App.css";

function App() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-10">
      <div className="text-center mb-8">
        <p>HELLO FLIP</p>
      </div>

      <div className="flex justify-center grid grid-cols-3 grid-rows-2 w-2/4 ">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="flex justify-center items-center">
            <img src={back} alt="" className="w-36 m-10" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
