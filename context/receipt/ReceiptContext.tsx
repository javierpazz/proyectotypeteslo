import { createContext } from 'react';
import { IReceiptCart } from '../../src/interfaces';


interface ContextProps {
    isLoaded: boolean;
    receipt: IReceiptCart[];
    numberOfItems: number;
    subTotal: number;
    // tax: number;
    total: number;
    // orderAddress?: orderAddress,
    // Methods
    addProductToReceipt: (product: IReceiptCart) => void;
    updateReceiptQuantity: (product: IReceiptCart) => void;
    removeReceiptProduct: (product: IReceiptCart) => void;
    removeReceipt: () => void;
    // updateAddress: (address: orderAddress) => void;

    //Orders
    createReceipt: () => Promise<{ hasError: boolean; message: string; }>;
    createParam: () => Promise<{ hasError: boolean; message: string; }>;
}


export const ReceiptContext = createContext({} as ContextProps );