/* Using ethers.js*/

import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import abi from '../contracts/Transactions.json';
import { GlobalContent, TransactionProp } from "../types";

const contractAddress = "0x7bc3e664B22502470DcE5Dba0c4c23c190Cdd97D";
const contractABI = abi.abi;

export const TransactionContext = React.createContext<GlobalContent | null>(null);

const { ethereum } = window;

const createEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer);
  return transactionsContract;
};

export const TransactionsProvider = ({ children }: TransactionProp) => {
  const [formData, setformData] = useState({ addressTo: "", amount: "", gif: "", message: "" });
  const [currentAccount, setCurrentAccount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(localStorage.getItem("transactionCount"));
  const [transactions, setTransactions] = useState([]);
  const [accBalance, setBalance] = useState('')


  const addressBalance = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(ethereum);
      let bal = await provider.getBalance(currentAccount);
      setBalance(ethers.utils.formatEther(bal));
    } catch (error) {
      console.log(error);
    }
  };

  const getAllTransactions = async () => {
    try {
      if (ethereum) {
        const transactionsContract = createEthereumContract();
        const availableTransactions = await transactionsContract.getAllTransactions();

        const structuredTransactions = availableTransactions.map(function (transaction: { receiver: any; sender: any; timestamp: { toNumber: () => number; }; message: any; gif: any; amount: { _hex: string; }; }) {
          return ({
            addressTo: transaction.receiver,
            addressFrom: transaction.sender,
            timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
            message: transaction.message,
            gif: transaction.gif,
            amount: parseInt(transaction.amount._hex) / (10 ** 18)
          });
        });
        setTransactions(structuredTransactions?.reverse());
      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfWalletIsConnect = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");
      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        getAllTransactions();
      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfTransactionsExists = async () => {
    try {
      if (ethereum) {
        const transactionsContract = createEthereumContract();
        const currentTransactionCount = await transactionsContract.getTransactionCount();
        window.localStorage.setItem("transactionCount", currentTransactionCount);
      }
    } catch (error) {
      console.log(error);

    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({ method: "eth_requestAccounts", });

      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const sendTransaction = async () => {
    try {
      if (ethereum) {
        const { addressTo, amount, gif, message } = formData;
        const transactionsContract = createEthereumContract();
        const parsedAmount = ethers.utils.parseEther(amount);

        await ethereum.request({
          method: "eth_sendTransaction",
          params: [{
            from: currentAccount,
            to: addressTo,
            gas: "0x5208",
            value: parsedAmount._hex,
          }],
        });

        addressBalance()
        const transactionHash = await transactionsContract.addToBlockchain(addressTo, parsedAmount, gif, message);

        setIsLoading(true);
        console.log(`Loading - ${transactionHash.hash}`);
        await transactionHash.wait();
        console.log(`Success - ${transactionHash.hash}`);
        setIsLoading(false);

        const transactionsCount = await transactionsContract.getTransactionCount();

        setTransactionCount(transactionsCount.toNumber());
      } else {
        console.log("No ethereum object");
      }
    } catch (error) {
      console.log(error);

    }
  };

  useEffect(() => {
    addressBalance()
    checkIfWalletIsConnect();
    checkIfTransactionsExists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactionCount, currentAccount]);

  return (
    <TransactionContext.Provider
      value={{
        transactionCount,
        connectWallet,
        transactions,
        currentAccount,
        isLoading,
        sendTransaction,
        formData,
        setformData,
        accBalance
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};