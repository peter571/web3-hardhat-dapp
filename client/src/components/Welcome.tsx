import React, { useContext } from "react";
import EthCard from "./EthCard";
import InputForm from "./InputForm";
import { TransactionContext } from "../context/TransactionContext";

const Welcome = () => {
  const values = useContext(TransactionContext);

  return (
    <div className="flex flex-col sm:flex-row my-4">
      <div className="sm:basis-2/3 flex flex-col my-auto">
        <h1 className="text-[#B4EDF0] text-4xl sm:w-[50%]">
          Send Crypto across the world.
        </h1>
        <br />
        <p className="text-[#B4EDF0] text-xl sm:w-[80%]">
          Explore the crypto world. Send cryptocurrencies easily on
          K-Crypt.
        </p>
        <br />
        {!values?.currentAccount && (
          <button
            className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 bg-[#FF6737] rounded-full p-2 text-white text-sm w-[25%]"
            onClick={values?.connectWallet}>
            Connect Wallet
          </button>
        )}
      </div>

      <div className="sm:basis-1/3">
        <EthCard />
        <br />
        <InputForm />
      </div>
    </div>
  );
};

export default Welcome;
