import React, { useContext } from "react";
import Transaction from "./Transaction";
import { TransactionContext } from "../context/TransactionContext";

const Transactions = () => {
  const values = useContext(TransactionContext);

  return (
    <div>
      <h3 className="text-white text-center my-2">Latest Transactions</h3>
      <div className="bg-[#302b63]">
        {values?.transactions?.map((transaction, id) => (
          <Transaction key={id} {...transaction} />
        ))}
      </div>
    </div>
  );
};

export default Transactions;
