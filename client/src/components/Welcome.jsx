import React, { useContext } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import EthCard from "./EthCard";
import InputForm from "./InputForm";
import { TransactionContext } from "../context/TransactionContext";

const Welcome = () => {
  const { currentAccount, connectWallet } = useContext(TransactionContext);

  return (
    <Container className="my-3">
      <Row>
        <Col xs={12} sm={6} className="m-auto">
          <h1 className="text-white text-start fs-1" style={{ width: "20rem" }}>
            Send Crypto across the worlds
          </h1>
          <br />
          <p className="text-white text-start" style={{ width: "20rem" }}>
            Explore the crypto world. Buy and sell cryptocurrencies easily on
            K-Crypt.
          </p>
          {!currentAccount && (
            <Button className="my-2 wallet-btn" onClick={connectWallet}>
              Connect Wallet
            </Button>
          )}
        </Col>

        <Col className="m-auto" xs={12} md={6}>
          <EthCard />
          <br />
          <InputForm />
        </Col>
      </Row>
    </Container>
  );
};

export default Welcome;
