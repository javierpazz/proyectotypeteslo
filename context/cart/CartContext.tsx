import { createContext } from 'react';
import { ICartProduct, OrderAddress } from '../../src/interfaces';


interface ContextProps {
    isLoaded: boolean;
    cart: ICartProduct[];
    numberOfItems: number;
    subTotal: number;
    tax: number;
    total: number;
    orderAddress?: OrderAddress,
    id_config: string,
    // Methods
    addProductToCart: (product: ICartProduct) => void;
    addProductToCartEsc: (product: ICartProduct) => void;
    addTodosProductToCartEscPar: (products: ICartProduct[]) => void;
    addTodosProductToCartEsc: (products: ICartProduct[], remDat:any) => void;
    updateCartQuantity: (product: ICartProduct) => void;
    removeCartProduct: (product: ICartProduct) => void;
    removeCart: () => void;
    updateAddress: (address: OrderAddress) => void;

    //Orders
    createOrder: () => Promise<{ hasError: boolean; message: string; }>;
    createParam: () => Promise<{ hasError: boolean; message: string; }>;
}


export const CartContext = createContext({} as ContextProps );