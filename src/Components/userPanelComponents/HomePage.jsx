import React from "react";
import SubscribeNow from "./SubscribeNow";
import Banner from "./Banner";
import Policies from "./Policies";
import exchange_icon from "../../assets/frontend_assets/exchange_icon.png";
import support_img from "../../assets/frontend_assets/support_img.png";
import quality_icon from "../../assets/frontend_assets/quality_icon.png";
import Bestsellers from "./Bestsellers";
import LatestCoection from "./LatestCollections";

const policiesArray = [
  {
    icon: exchange_icon,
    heading: "Easy Exchange Policy",
    description: "We offer hassle free exchange policy",
  },
  {
    icon: quality_icon,
    heading: "7 Days Return Policy",
    description: "We provide 7 days free return policy",
  },
  {
    icon: support_img,
    heading: "Best customer support",
    description: "we provide 24/7 customer support",
  },
];

const HomePage = () => {
  return (
    <>
      <div className="custom-padding">
        <Banner />
        <LatestCoection />
        <Bestsellers />
        <div className="xs:flex justify-around gap-4">
          {policiesArray.map((policy, index) => (
            <Policies key={index} policy={policy} />
          ))}
        </div>
        <SubscribeNow />
      </div>
    </>
  );
};

export default HomePage;
