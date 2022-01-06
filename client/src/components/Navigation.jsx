import React, { useContext } from "react";
import { Container, Navbar, Button } from "react-bootstrap";
import { TransactionContext } from "../context/TransactionContext";

const Navigation = () => {
  const { currentAccount, connectWallet } = useContext(TransactionContext);

  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand className="text-white logo-txt">K-Crypt</Navbar.Brand>
        {!currentAccount && (
          <Button className="wallet-btn" onClick={connectWallet}>Connect Wallet</Button>
        )}
      </Container>
    </Navbar>
  );
};

export default Navigation;
