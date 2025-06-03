import React from "react";

const AccessoriesHeadings = ({ title, desc }) => {
  return (
    <div className="info mt-5 sm:mt-16 lg:mt-20 px-4 sm:px-8">
      <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl">{title}</h1>
      <div className="h-1 w-16 sm:w-20 bg-[#0680d0] mt-3 sm:mt-4 ml-4 sm:ml-6"></div>
      <p className="text-base sm:text-lg md:text-2xl font-semibold mt-3 sm:mt-4 ml-4 sm:ml-6">
        {desc}
      </p>
    </div>
  );
};

export default AccessoriesHeadings;
