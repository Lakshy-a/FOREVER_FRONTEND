import React from "react";
import support_icon from "../../assets/frontend_assets/support_img.png";

const Policies = ({policy}) => {
  return (
    <>
      <div className="flex flex-col items-center mt-16">
        <div className=""><img src={policy.icon} className="w-12" /></div>
        <h1 className="mt-4 font-semibold">{policy.heading}</h1>
        <p className="text-sm text-gray-400">{policy.description}</p>
      </div>
    </>
  );
};

export default Policies;
