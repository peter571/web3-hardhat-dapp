import React, { useContext } from "react";
import Loader from "./Loader";
import { TransactionContext } from "../context/TransactionContext";
import Input from "./Input";

const InputForm = () => {
  const values = useContext(TransactionContext);

  const handleSubmit = async (e: React.FormEvent<EventTarget>) => {
    const formValues = values?.formData;

    e.preventDefault();

    if (!formValues?.addressTo || !formValues?.amount || !formValues?.gif || !formValues?.message) return alert('Fill all inputs!');

    await values?.sendTransaction();
    values?.setformData({ ...values?.formData, addressTo: '', amount: '', gif: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    values?.setformData({ ...values?.formData, [e.target.name]: e.target.value });
  };

  return (
    <form
      className="flex flex-col gap-3 rounded"
      onSubmit={handleSubmit}>
      <Input
        type="text"
        name={"addressTo"}
        value={values?.formData?.addressTo}
        placeholder={"Address To"}
        onChange={handleChange} />

      <Input
        type="number"
        name={"amount"}
        value={values?.formData?.amount}
        placeholder={"Amount"}
        onChange={handleChange} />

      <Input
        type="text"
        name={"gif"}
        value={values?.formData?.gif}
        placeholder={"gif"}
        onChange={handleChange} />

      <Input
        type="text"
        name={"message"}
        value={values?.formData?.message}
        placeholder={"Message"}
        onChange={handleChange} />

      <div>
        <hr className="text-white" />
      </div>

      {values?.isLoading ? (
        <Loader />
      ) : (
        <button
          className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300 bg-gradient-to-r from-purple-500 rounded-lg text-white p-2 to-pink-500" type="submit">
          Send
        </button>
      )}
    </form>
  );
};

export default InputForm;
