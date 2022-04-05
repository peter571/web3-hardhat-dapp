import React, { useContext } from "react";
import { FaEthereum } from "react-icons/fa";
import { TransactionContext } from "../context/TransactionContext";
import { shortenAddress } from "../utils/utils";

const EthCard = () => {
  const values = useContext(TransactionContext);

  return (
    <div className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300 bg-gradient-to-r from-violet-500 to-fuchsia-500 p-2 h-32 relative">
      <h1 className="absolute top-2">
        <FaEthereum size={20} className="text-black" />
        <span className="font-semibold">Ethereum</span>
      </h1>
      <p className="absolute bottom-6 text-black">
        {shortenAddress(values?.currentAccount)}
      </p>
      {values?.accBalance && (
        <p className="absolute bottom-2 text-black font-bold">
          Balance: {Number(values?.accBalance).toFixed(5)}
        </p>
      )}
    </div>
  );
};

export default EthCard;
