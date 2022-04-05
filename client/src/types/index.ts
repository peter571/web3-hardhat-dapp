import React, { HTMLInputTypeAttribute } from "react"

export interface TransactionProp {
    addressFrom: any;
    addressTo: any;
    timestamp: { toNumber: () => number; };
    message: any;
    gif: any;
    amount: { _hex: string; };
}

export interface GlobalContent {
    transactionCount: string | null;
    connectWallet: () => void;
    transactions: TransactionProp[];
    currentAccount: string;
    isLoading: boolean;
    sendTransaction: () => void;
    formData: {
        addressTo: string, amount: string, gif: string, message: string
    };
    setformData: React.Dispatch<React.SetStateAction<{ addressTo: string; amount: string; gif: string; message: string; }>>;
    accBalance: string;
}

export interface TransactionProp {
    children: React.ReactNode;
}

export interface InputProp {
    type: HTMLInputTypeAttribute | undefined;
    name: string;
    value: any;
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void | undefined;
}

export interface GifProp {
    gifurl: string;
}