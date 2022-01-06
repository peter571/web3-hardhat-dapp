import React, { useContext } from "react";
import { Card } from "react-bootstrap";
import { FaEthereum } from "react-icons/fa";
import { TransactionContext } from "../context/TransactionContext";
import { shortenAddress } from "../utils/utils";

const EthCard = () => {
  const { currentAccount, accBalance } = useContext(TransactionContext);

  return (
    <Card
      className="p-2 eth-card m-auto"
      style={{ minWidth: "8rem", minHeight: "10rem" }}
    >
      <Card.Body>
        <Card.Title className="text-start">
          <FaEthereum className="mb-1" /> Ethereum
        </Card.Title>
        <Card.Text className="position-absolute bottom-0 fw-bold">
          {shortenAddress(currentAccount)}
        </Card.Text>
        {accBalance && (
          <Card.Text className="position-absolute bottom-0 fw-bold">
            Balance: {Number(accBalance).toFixed(5)}
          </Card.Text>
        )}
      </Card.Body>
    </Card>
  );
};

export default EthCard;
