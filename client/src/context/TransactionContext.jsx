/*web3.0 */
// import React, { useEffect, useState } from "react";
// import Web3 from "web3";
// import TransactionsContract from '../contracts/Transactions.json';

// export const TransactionContext = React.createContext();

// const web3 = new Web3(Web3.givenProvider);

// const createTransactionsContract = async () => {
//   const networkId = await web3.eth.getChainId()
//   const transactionsContract = new web3.eth.Contract(TransactionsContract.abi,
//     TransactionsContract.networks[networkId] && TransactionsContract.networks[networkId].address);

//   return transactionsContract;
// };

// export const TransactionsProvider = ({ children }) => {
//   const [formData, setformData] = useState({ addressTo: "", amount: "", gif: "", message: "" });
//   const [currentAccount, setCurrentAccount] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [transactionCount, setTransactionCount] = useState(localStorage.getItem("transactionCount"));
//   const [transactions, setTransactions] = useState([]);

//   const handleChange = (e) => {
//     setformData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const getAllTransactions = async () => {
//     try {
//       if (window.ethereum) {
//         const transactionsContract = createTransactionsContract();

//         const availableTransactions = await transactionsContract.methods.getAllTransactions();

//         const structuredTransactions = availableTransactions.map((transaction) => ({
//           addressTo: transaction.receiver,
//           addressFrom: transaction.sender,
//           timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
//           message: transaction.message,
//           gif: transaction.gif,
//           amount: parseInt(transaction.amount._hex) / (10 ** 18)
//         }));

//         console.log(structuredTransactions);

//         setTransactions(structuredTransactions);
//       } else {
//         console.log("Ethereum is not present");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const checkIfWalletIsConnect = async () => {
//     try {
//       if (!window.ethereum) return alert("Please install MetaMask.");

//       const accounts = await window.ethereum.request({ method: "eth_accounts" });

//       if (accounts.length) {
//         setCurrentAccount(accounts[0]);

//         getAllTransactions();
//       } else {
//         console.log("No accounts found");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // const checkIfTransactionsExists = async () => {
//   //   try {
//   //     if (window.ethereum) {
//   //       const transactionsContract = createTransactionsContract();
//   //       const currentTransactionCount = await transactionsContract.methods.getTransactionCount();

//   //       window.localStorage.setItem("transactionCount", currentTransactionCount);
//   //     }
//   //   } catch (error) {
//   //     console.log(error);

//   //     throw new Error("No ethereum object");
//   //   }
//   // };

//   const connectWallet = async () => {
//     try {
//       if (!window.ethereum) return alert("Please install MetaMask.");

//       const accounts = await window.ethereum.request({ method: "eth_requestAccounts", });

//       setCurrentAccount(accounts[0]);
//     } catch (error) {
//       console.log(error);

//       throw new Error("No ethereum object");
//     }
//   };


//   const sendTransaction = async () => {
//     try {
//       if (window.ethereum) {
//         const { addressTo, amount, gif, message } = formData;
//         const transactionsContract = createTransactionsContract();
//         const parsedAmount = web3.utils.toWei(amount);
//         const blockAmount = parseInt(parsedAmount)
//         await window.ethereum.request({
//           method: "eth_sendTransaction",
//           params: [{
//             from: currentAccount,
//             to: addressTo,
//             gas: "0x5208",
//             value: web3.utils.toHex(parsedAmount)
//           }],
//         });

//         const transactionHash = await transactionsContract.methods.addToBlockchain(addressTo, blockAmount, gif, message);

//         setIsLoading(true);
//         console.log(`Loading - ${transactionHash.hash}`);
//         await transactionHash.wait();
//         console.log(`Success - ${transactionHash.hash}`);
//         setIsLoading(false);

//         const transactionsCount = await transactionsContract.methods.getTransactionCount();

//         setTransactionCount(transactionsCount.toNumber());
//       } else {
//         console.log("No ethereum object");
//       }
//     } catch (error) {
//       console.log(error);

//       throw new Error("No ethereum object");
//     }
//   };

//   useEffect(() => {
//     checkIfWalletIsConnect();
//     //checkIfTransactionsExists();
//   }, [transactionCount]);

//   return (
//     <TransactionContext.Provider
//       value={{
//         transactionCount,
//         connectWallet,
//         transactions,
//         currentAccount,
//         isLoading,
//         sendTransaction,
//         handleChange,
//         formData,
//       }}
//     >
//       {children}
//     </TransactionContext.Provider>
//   );
// };


/* Using ethers.js*/

import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import abi from '../contracts/Transactions.json';
//console.log(ethers)
const contractAddress = "0x7bc3e664B22502470DcE5Dba0c4c23c190Cdd97D";

const contractABI = abi.abi;

export const TransactionContext = React.createContext();

const { ethereum } = window;

const createEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer);

  return transactionsContract;
};

export const TransactionsProvider = ({ children }) => {
  const [formData, setformData] = useState({ addressTo: "", amount: "", gif: "", message: "" });
  const [currentAccount, setCurrentAccount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(localStorage.getItem("transactionCount"));
  const [transactions, setTransactions] = useState([]);
  const [accBalance, setBalance] = useState(null)

  const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const addressBalance = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(ethereum);
      let bal = await provider.getBalance(currentAccount);
      setBalance(ethers.utils.formatEther(bal));
    } catch (error) {
      console.log(error);
    }
  };

  console.log(accBalance)

  const getAllTransactions = async () => {
    try {
      if (ethereum) {
        const transactionsContract = createEthereumContract();

        const availableTransactions = await transactionsContract.getAllTransactions();

        const structuredTransactions = availableTransactions.map((transaction) => ({
          addressTo: transaction.receiver,
          addressFrom: transaction.sender,
          timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
          message: transaction.message,
          gif: transaction.gif,
          amount: parseInt(transaction.amount._hex) / (10 ** 18)
        }));

        console.log(structuredTransactions);

        setTransactions(structuredTransactions);
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
        handleChange,
        formData,
        setformData,
        accBalance
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};