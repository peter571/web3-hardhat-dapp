import { shortenAddress } from "../utils/utils";
import useFetch from '../hooks/useFetch'
import defaultImg from '../images/tx.jpg';
import { TransactionProp } from '../types'

const Transaction = (prop: TransactionProp) => {
  const gifUrl = useFetch(prop.gif);

  return (
    <div className="flex flex-col gap-2 sm:flex-row justify-between md:w-[70%] p-2">
      <div className="flex gap-2">
        <img className="rounded-full w-16 h-16 sm:w-24 sm:h-24" src={gifUrl || defaultImg} alt="" height={50} width={50} />
        <div className="flex flex-col my-auto">
          <p className="text-sky-600 text-sm">{prop.message}</p>
          <p className="text-white text-xs">{prop.timestamp}</p>
        </div>
      </div>
      <div className="flex flex-col my-auto">
        <p className="text-white">From: <a className="text-sky-600" href={`https://ropsten.etherscan.io/address/${prop.addressFrom}`}>{shortenAddress(prop.addressFrom)}</a></p>
        <p className="text-white">To: <a className="text-sky-600" href={`https://ropsten.etherscan.io/address/${prop.addressTo}`}>{shortenAddress(prop.addressTo)}</a></p>
      </div>
      <p className="flex flex-col my-auto text-white">
        {prop.amount} Eth
      </p>
    </div>
  );
};

export default Transaction;
