import React, { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";

const Navigation = () => {
  const values = useContext(TransactionContext);

  return (
    <nav>
      <div className="flex justify-between">
        <h1 className="text-[#B4EDF0] text-3xl font-extrabold">K-Crypt</h1>
        {!values?.currentAccount && (
          <button className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 bg-[#FF6737] rounded-full py-2 px-4 text-white text-sm" onClick={values?.connectWallet}>
            Connect Wallet
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
