import React from "react";

const AccessoriesHeadings = ({title, desc}) => {
  return (
    <div className="info mt-20">
      <h1 className="font-bold text-4xl">{title}</h1>
      <div className="h-1 w-20 bg-[#0680d0] mt-4 ml-10"></div>
      <p className="text-2xl font-semibold mt-4 ml-10">{desc}</p>
    </div>
  );
};

export default AccessoriesHeadings;
