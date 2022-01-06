import React, { useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Transaction from "./Transaction";
import { TransactionContext } from "../context/TransactionContext";

const Transactions = () => {
  const { transactions } = useContext(TransactionContext);

   return (
    <Container>
      <h3 className="text-white text-center my-2">Latest Transactions</h3>
      <Row className="d-flex space-between">
       {[...transactions].reverse().map((transaction, id) => (
          <Col xs={12} sm={6} md={4} className="m-auto" key={id}>
          <Transaction {...transaction}  />
        </Col>
       ))}

      </Row>
    </Container>
  );
};

export default Transactions;
