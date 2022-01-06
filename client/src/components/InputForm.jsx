import React, { useContext } from "react";
import { Form, Button } from "react-bootstrap";
import Loader from "./Loader";
import { TransactionContext } from "../context/TransactionContext";

const InputForm = () => {
  const { handleChange, sendTransaction, formData, isLoading, setFormData } =
    useContext(TransactionContext);

  const handleSubmit = async (e) => {
    const { addressTo, amount, gif, message } = formData;

    e.preventDefault();

    if (!addressTo || !amount || !gif || !message) return alert('Fill all inputs!');

    await sendTransaction();
    setFormData({ ...formData, addressTo: "", amount: "", gif: "", message: "" });
  };

  return (
    <Form
      className="m-auto d-grid m-2 bg-form p-2 rounded"
      onSubmit={handleSubmit}
    >
      <Form.Group className="mb-3" controlId="address">
        <Form.Control
          type="text || number"
          name="addressTo"
          value={formData.addressTo}
          placeholder="Address To"
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="amount">
        <Form.Control
          type="number"
          name="amount"
          step="0.0001"
          value={formData.amount}
          placeholder="Amount"
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="gif">
        <Form.Control
          type="text"
          name="gif"
          placeholder="keyword(GIF)"
          value={formData.gif}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="message">
        <Form.Control
          type="text"
          name="message"
          placeholder="Message"
          value={formData.message}
          onChange={handleChange}
        />
      </Form.Group>

      <div>
        <hr className="text-white" />
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <Button variant="primary" type="submit">
          Send
        </Button>
      )}
    </Form>
  );
};

export default InputForm;
