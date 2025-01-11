import React from "react";

const Footer = () => {
  return (
    <div className="md:mx-10">
      <div>
        <div className="py-5 flex justify-center items-center space-x-2">
          <img
            src={"/footer.jpg"}
            alt="Sri Lanka Icon"
            className="h-[5.5rem]"
          />
          <p className="text-medium font-medium pl-3 text-gray-800">
            Crafted with <span>&#x2764;</span>
            <br /> in Sri Lanka
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
