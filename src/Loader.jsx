import React from 'react';
import "./Loader.css";

function Loader() {


  return (
    <div>
      <div class="loader relative w-60 h-32 mb-2.5 border border-gray-300 p-4 bg-gray-300 overflow-hidden">
  <div class="loader-overlay"></div>
  <div class="wrapper w-full h-full relative">
    <div class="circle bg-gray-400 w-12 h-12 rounded-full"></div>
    <div class="line-1 absolute top-[11px] left-[58px] h-2.5 w-24 bg-gray-400"></div>
    <div class="line-2 absolute top-10 left-[58px] h-2.5 w-36 bg-gray-400"></div>
    <div class="line-3 absolute top-[57px] left-0 h-2.5 w-full bg-gray-400"></div>
    <div class="line-4 absolute top-[80px] left-0 h-2.5 w-[92%] bg-gray-400"></div>
  </div>
</div>


    </div>
  )
}

export default Loader
