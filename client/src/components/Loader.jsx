import React from "react";
import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <div className="d-flex align-center justify-content-center m-1">
      <Spinner
        animation="border"
        variant="info"
      />
      ;
    </div>
  );
};

export default Loader;
