import { FC, ReactNode, useEffect, useReducer } from 'react';
import Cookie from 'js-cookie';
import axios from 'axios';
import { IReceiptCart, IReceipt } from '../../src/interfaces';
import { ReceiptContext, receiptReducer } from '.';
import { stutzApi } from '../../api';
// import { getEnvVariables } from '../../helpers';

export interface ReceiptState {
    isLoaded: boolean;
    receipt: IReceiptCart[];
    numberOfItems: number;
    subTotal: number;
    // tax: number;
    total: number;
    // shippingAddress?: ShippingAddress;
}




interface Props {
    children?: ReactNode;
}


const RECEIPT_INITIAL_STATE: ReceiptState = {
    isLoaded: false,
    receipt: [],
    numberOfItems: 0,
    subTotal: 0,
    // tax: 0,
    total: 0,
    // shippingAddress: undefined
}


export const ReceiptProvider:FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer( receiptReducer , RECEIPT_INITIAL_STATE );
    // const { VITE_TAX_RATE } = getEnvVariables()
    // Efecto
    useEffect(() => {
        try {
            const cookieProducts = Cookie.get('receipt') ? JSON.parse( Cookie.get('receipt')! ): []
            dispatch({ type: '[Receipt] - LoadReceipt from cookies | storage', payload: cookieProducts });
        } catch (error) {
            dispatch({ type: '[Receipt] - LoadReceipt from cookies | storage', payload: [] });
        }
    }, []);

        
    
    useEffect(() => {
      Cookie.set('receipt', JSON.stringify( state.receipt ));
    }, [state.receipt]);


    useEffect(() => {
        
        const numberOfItems = state.receipt.reduce( ( prev ) => 1 + prev , 0 );
        const subTotal = state.receipt.reduce( ( prev, current ) => current.amountval + prev, 0 );
        // const taxRate =  Number(VITE_TAX_RATE || 0);
        // const taxRate = state.receipt.reduce( ( prev, current ) => (current.price * current.quantity * (current.porIva/100)) + prev, 0 );
        //  const taxRate = 10;
    
        const orderSummary = {
            numberOfItems,
            subTotal,
            // tax: subTotal * taxRate,
            // tax: taxRate,
            // total: subTotal * ( taxRate + 1 )
            // total: subTotal + taxRate 
            total: subTotal 
        }

        dispatch({ type: '[Receipt] - Update order summary', payload: orderSummary });
    }, [state.receipt]);



    const addProductToReceipt = ( product: IReceiptCart ) => {
        // console.log("product")
        // console.log(product)

        //! Nivel 1
        // dispatch({ type: '[Receipt] - Add Product', payload: product });

        //! Nivel 2
        // const productsInReceipt = state.receipt.filter( p => p._id !== product._id && p.size !== product.size );
        // dispatch({ type: '[Receipt] - Add Product', payload: [...productsInReceipt, product] })

        //! Nivel Final
        const productInReceipt = state.receipt.some( p => p._id === product._id );
        if ( !productInReceipt ) return dispatch({ type: '[Receipt] - Update products in Receipt', payload: [...state.receipt, product ] })

        const productInReceiptButDifferentSize = state.receipt.some( p => p._id === product._id );
        if ( !productInReceiptButDifferentSize ) return dispatch({ type: '[Receipt] - Update products in Receipt', payload: [...state.receipt, product ] })

        // Acumular
        const updatedProducts = state.receipt.map( p => {
            if ( p._id !== product._id ) return p;

            // Actualizar la cantidad
            // p.quantity = product.quantity;
            // p.price = product.price;
            return p;
        });

        dispatch({ type: '[Receipt] - Update products in Receipt', payload: updatedProducts });

    }



    const updateReceiptQuantity = ( product: IReceiptCart ) => {
        dispatch({ type: '[Receipt] - Change Receipt quantity', payload: product });
    }

    const removeReceiptProduct = ( product: IReceiptCart ) => {
        dispatch({ type: '[Receipt] - Remove product in Receipt', payload: product });
    }

    const removeReceipt = () => {
            dispatch({ type: '[Receipt] - Order complete' });
            dispatch({ type: '[Receipt] - LoadReceipt from cookies | storage', payload: [] });
    }


    const createReceipt = async ():Promise<{ hasError: boolean; message: string; }> => {

        const body: IReceipt = {
            receiptItems: state.receipt.map( p => ({
                ...p,
                // size: p.size!
            })),
            subTotal: state.subTotal,
            total: state.total,
            isPaid: false,
            totalBuy: 0,
            codConNum: 0,

            cajNum: 0,
            cajDat: "",
            desVal: "",
            recNum: 0,
            recDat: "",
            paidAt: "",
            ordNum: 0,
            salbuy: "",
            notes: "",
        }
        // console.log(body);



        try {
            const {data} = await stutzApi.post('/api/tes/orders', body)
            dispatch({ type: '[Receipt] - Order complete' });
            return {
                hasError: false,
                message: data._id!
            }


        } catch (error) {
            if ( axios.isAxiosError(error) ) {
                return {
                    hasError: true,
                    message: error.response?.data.message
                }
            }
            return {
                hasError: true,
                message : 'Error no controlado, hable con el administrador'
            }

        }
    }
    const createParam = async ():Promise<{ hasError: boolean; message: string; }> => {

        try {
            dispatch({ type: '[Receipt] - Order complete' });
            return {
                hasError: false,
                message: "data._id!"
            }


        } catch (error) {
            return {
                hasError: true,
                message : 'Error no controlado, hable con el administrador'
            }

        }
    }

    return (
        <ReceiptContext.Provider value={{
            ...state,

            // Methods
            addProductToReceipt,
            removeReceiptProduct,
            removeReceipt,
            updateReceiptQuantity,
            createReceipt,
            createParam,
        }}>
            { children }
        </ReceiptContext.Provider>
    )
};