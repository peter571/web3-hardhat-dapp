import React from "react";

const Footer = () => {
  return (
    <div className="flex flex-col gap-4">
      <hr className="text-white text-center mt-4" />
      <div className="flex flex-col sm:flex-row items-center gap-2 sm:justify-between">
        <p className="text-[#B4EDF0] text-xl font-extrabold">
          K-Crypt
        </p>
        <p className="text-white">
          Be with us in the future.
        </p>
        <p className="text-white">
          All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
