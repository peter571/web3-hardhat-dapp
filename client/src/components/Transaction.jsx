import React from "react";
import { Card } from "react-bootstrap";
import { shortenAddress } from "../utils/utils";
import useFetch from '../hooks/useFetch'
import defaultImg from '../images/tx.jpg'

const Transaction = ({ addressTo, addressFrom, timestamp, message, gif, amount }) => {
  const gifUrl = useFetch({ gif })
  return (
    <Card className="m-2">
      <Card.Body>
        <Card.Link
          className="text-dark text-decoration-none"
          href={`https://ropsten.etherscan.io/address/${addressFrom}`}
          target="_blank"
          rel="noreferrer"
        >
          <strong>From:</strong> {shortenAddress(addressFrom)}
        </Card.Link>

        <Card.Link
          className="text-dark text-decoration-none"
          href={`https://ropsten.etherscan.io/address/${addressTo}`}
          target="_blank"
          rel="noreferrer"
        >
          <strong>To:</strong> {shortenAddress(addressTo)}
        </Card.Link>

        <Card.Text>{amount}{" "}<strong>Eth</strong></Card.Text>
        <Card.Text>{message}</Card.Text>
      </Card.Body>
      <Card.Img variant="top" src={gifUrl || defaultImg} />
      <Card.Text className="text-center m-2">{timestamp}</Card.Text>
    </Card>
  );
};

export default Transaction;
