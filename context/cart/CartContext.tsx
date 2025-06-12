import { createContext } from 'react';
import { ICartProduct, ShippingAddress } from '../../src/interfaces';


interface ContextProps {
    isLoaded: boolean;
    cart: ICartProduct[];
    numberOfItems: number;
    subTotal: number;
    tax: number;
    total: number;
    shippingAddress?: ShippingAddress,
    // Methods
    addProductToCart: (product: ICartProduct) => void;
    addProductToCartEsc: (product: ICartProduct) => void;
    addTodosProductToCartEscPar: (products: ICartProduct[]) => void;
    addTodosProductToCartEsc: (products: ICartProduct[], remDat:any) => void;
    updateCartQuantity: (product: ICartProduct) => void;
    removeCartProduct: (product: ICartProduct) => void;
    removeCart: () => void;
    updateAddress: (address: ShippingAddress) => void;

    //Orders
    createOrder: () => Promise<{ hasError: boolean; message: string; }>;
    createParam: () => Promise<{ hasError: boolean; message: string; }>;
}


export const CartContext = createContext({} as ContextProps );