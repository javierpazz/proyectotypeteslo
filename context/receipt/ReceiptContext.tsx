import { createContext } from 'react';
import { IReceiptCart } from '../../src/interfaces';


interface ContextProps {
    isLoaded: boolean;
    receipt: IReceiptCart[];
    numberOfItems: number;
    subTotal: number;
    // tax: number;
    total: number;
    // shippingAddress?: ShippingAddress,
    // Methods
    addProductToReceipt: (product: IReceiptCart) => void;
    updateReceiptQuantity: (product: IReceiptCart) => void;
    removeReceiptProduct: (product: IReceiptCart) => void;
    removeReceipt: () => void;
    // updateAddress: (address: ShippingAddress) => void;

    //Orders
    createReceipt: () => Promise<{ hasError: boolean; message: string; }>;
    createParam: () => Promise<{ hasError: boolean; message: string; }>;
}


export const ReceiptContext = createContext({} as ContextProps );