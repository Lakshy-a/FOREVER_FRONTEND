import React from "react";

const ChoosingReasons = ({item}) => {
  return (
    <div className="border px-8 py-6 xs:px-12 xs:py-12">
      <h2 className="font-bold text-sm">{item.heading}</h2>
      <p className="mt-4 text-sm text-gray-700">{item.data}  </p>
    </div>
  );
};

export default ChoosingReasons;
