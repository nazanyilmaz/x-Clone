import React from "react";

const Aside = () => {
  return (
    <div className="max-xl:hidden m-8 ">
      <input
        placeholder="Search"
        className="w-[90%] flex justify-center bg-zinc-700  px-5 py-2 mb-10 rounded-full "
      />
      <img src="images1.png" className="mb-11 " />
      <img src="images-2.png" className="mb-11" />
      <img src="images-3.png" className="mb-11" />
    </div>
  );
};

export default Aside;
