import React from "react";
import { FaHome } from "react-icons/fa";

const App = () => {
  return (
    <>
      <div className="bg-[#F54927] m-[5.5px]">App</div>

      <button className="border border-blue-700 rounded bg-blue-300 text-red-500 px-3 py-1 hover:bg-blue-700 hover:text-white flex items-center gap-3">
       <FaHome className="text-green-500" /> <span>Abcd</span>
      </button>

      <div className="grid grid-cols-[200px_300px_600px]">
        <div className="border p-3 w-10 h-10">1</div>
        <div className="border p-3 w-10 h-10">2</div>
        <div className="border p-3 w-10 h-10">3</div>
        <div className="border p-3 w-10 h-10">4</div>
        <div className="border p-3 w-10 h-10">5</div>
        <div className="border p-3 w-10 h-10">6</div>
        <div className="border p-3 w-10 h-10">7</div>
        <div className="border p-3 w-10 h-10">8</div>
        <div className="border p-3 w-10 h-10">9</div>
        <div className="border p-3 w-10 h-10">10</div>
      </div>
    </>
  );
};

export default App;
