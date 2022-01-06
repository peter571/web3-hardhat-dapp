import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <Container>
      <Row className="m-auto text-center">
        <hr className="text-white text-center my-3" />
      </Row>
      <Row className="">
        <Col xs={12} sm={4}>
          <p className="text-white text-xs-center text-sm-start fw-5 logo-txt">
            K-Crypt
          </p>
        </Col>
        <Col xs={12} sm={4}>
          <p className="text-white text-xs-center text-sm-center">
            Be with us in the future.
          </p>
        </Col>
        <Col xs={12} sm={4}>
          <p className="text-white text-sm-end text-xs-center">
            All rights reserved.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
