import { FC, ReactNode, useEffect, useReducer } from 'react';
import Cookie from 'js-cookie';
import axios from 'axios';
import { ICartProduct, IOrder, ShippingAddress } from '../../src/interfaces';
import { CartContext, cartReducer } from './';
import { stutzApi } from '../../api';
// import { getEnvVariables } from '../../helpers';

export interface CartState {
    isLoaded: boolean;
    cart: ICartProduct[];
    numberOfItems: number;
    subTotal: number;
    tax: number;
    total: number;
    shippingAddress?: ShippingAddress;
}




interface Props {
    children?: ReactNode;
}


const CART_INITIAL_STATE: CartState = {
    isLoaded: false,
    cart: [],
    numberOfItems: 0,
    subTotal: 0,
    tax: 0,
    total: 0,
    shippingAddress: undefined
}


export const CartProvider:FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer( cartReducer , CART_INITIAL_STATE );
    // const { VITE_TAX_RATE } = getEnvVariables()
    // Efecto
    useEffect(() => {
        try {
            const cookieProducts = Cookie.get('cart') ? JSON.parse( Cookie.get('cart')! ): []
            dispatch({ type: '[Cart] - LoadCart from cookies | storage', payload: cookieProducts });
        } catch (error) {
            dispatch({ type: '[Cart] - LoadCart from cookies | storage', payload: [] });
        }
    }, []);

    useEffect(() => {

        if ( Cookie.get('firstName')){
            const shippingAddress = {
                firstName : Cookie.get('firstName') || '',
                lastName  : Cookie.get('lastName') || '',
                address   : Cookie.get('address') || '',
                address2  : Cookie.get('address2') || '',
                zip       : Cookie.get('zip') || '',
                city      : Cookie.get('city') || '',
                country   : Cookie.get('country') || '',
                phone     : Cookie.get('phone') || '',
            }
            
            dispatch({ type:'[Cart] - LoadAddress from Cookies', payload: shippingAddress })
        }
    }, [])
        
    
    useEffect(() => {
      Cookie.set('cart', JSON.stringify( state.cart ));
    }, [state.cart]);


    useEffect(() => {
        
        const numberOfItems = state.cart.reduce( ( prev, current ) => current.quantity + prev , 0 );
        const subTotal = state.cart.reduce( ( prev, current ) => (current.price * current.quantity) + prev, 0 );
        // const taxRate =  Number(VITE_TAX_RATE || 0);
        const taxRate = state.cart.reduce( ( prev, current ) => (current.price * current.quantity * (current.porIva/100)) + prev, 0 );
        //  const taxRate = 10;
    
        const orderSummary = {
            numberOfItems,
            subTotal,
            // tax: subTotal * taxRate,
            tax: taxRate,
            // total: subTotal * ( taxRate + 1 )
            total: subTotal + taxRate 
        }

        dispatch({ type: '[Cart] - Update order summary', payload: orderSummary });
    }, [state.cart]);



    const addProductToCart = ( product: ICartProduct ) => {
        // console.log("product")
        // console.log(product)

        //! Nivel 1
        // dispatch({ type: '[Cart] - Add Product', payload: product });

        //! Nivel 2
        // const productsInCart = state.cart.filter( p => p._id !== product._id && p.size !== product.size );
        // dispatch({ type: '[Cart] - Add Product', payload: [...productsInCart, product] })

        //! Nivel Final
        const productInCart = state.cart.some( p => p._id === product._id );
        if ( !productInCart ) return dispatch({ type: '[Cart] - Update products in cart', payload: [...state.cart, product ] })

        const productInCartButDifferentSize = state.cart.some( p => p._id === product._id && p.size === product.size );
        if ( !productInCartButDifferentSize ) return dispatch({ type: '[Cart] - Update products in cart', payload: [...state.cart, product ] })

        // Acumular
        const updatedProducts = state.cart.map( p => {
            if ( p._id !== product._id ) return p;
            if ( p.size !== product.size ) return p;

            // Actualizar la cantidad
            p.quantity = product.quantity;
            p.price = product.price;
            return p;
        });

        dispatch({ type: '[Cart] - Update products in cart', payload: updatedProducts });

    }

    const addTodosProductToCartEscPar = ( products: ICartProduct[] ) => {
        state.cart=[];
        const newCart = [...state.cart];

        products.forEach((product) => {
        const exists = newCart.some(p => p._id === product._id && p.size === product.size);
        
        if (!exists) {
            newCart.push(product);
        } else {
            newCart.forEach(p => {
            if (p._id === product._id && p.size === product.size) {
                p.quantity = product.quantity;
                p.price = product.price;
                p.venDat = product.venDat;
                p.observ = product.observ;
                p.terminado = product.terminado;
            }
            });
        }
        });

        dispatch({ type: '[Cart] - Update products in cart', payload: newCart });
    }

    const addTodosProductToCartEsc = ( products: ICartProduct[], remDat:any ) => {
        state.cart=[];
        const newCart = [...state.cart];

        products.forEach((product) => {
        const exists = newCart.some(p => p._id === product._id && p.size === product.size);
        
        if (!exists) {
            product.venDat=remDat;
            newCart.push(product);
        } else {
            newCart.forEach(p => {
            if (p._id === product._id && p.size === product.size) {
                p.quantity = product.quantity;
                p.price = product.price;
                // p.venDat = product.venDat;
                p.venDat = remDat;
                p.observ = product.observ;
                p.terminado = product.terminado;
            }
            });
        }
        });

        dispatch({ type: '[Cart] - Update products in cart', payload: newCart });

    }


    const addProductToCartEsc = ( product: ICartProduct ) => {
        // console.log("product")
        // console.log(product)

        //! Nivel 1
        // dispatch({ type: '[Cart] - Add Product', payload: product });

        //! Nivel 2
        // const productsInCart = state.cart.filter( p => p._id !== product._id && p.size !== product.size );
        // dispatch({ type: '[Cart] - Add Product', payload: [...productsInCart, product] })

        //! Nivel Final
        const productInCart = state.cart.some( p => p._id === product._id );
        if ( !productInCart ) return dispatch({ type: '[Cart] - Update products in cart', payload: [...state.cart, product ] })

        const productInCartButDifferentSize = state.cart.some( p => p._id === product._id && p.size === product.size );
        if ( !productInCartButDifferentSize ) return dispatch({ type: '[Cart] - Update products in cart', payload: [...state.cart, product ] })

        // Acumular
        const updatedProducts = state.cart.map( p => {
            if ( p._id !== product._id ) return p;
            if ( p.size !== product.size ) return p;

            // Actualizar la cantidad
            p.quantity = product.quantity;
            p.price = product.price;
            p.venDat = product.venDat;
            p.observ = product.observ;
            p.terminado = product.terminado;
            return p;
        });

        dispatch({ type: '[Cart] - Update products in cart', payload: updatedProducts });

    }


    const updateCartQuantity = ( product: ICartProduct ) => {
        dispatch({ type: '[Cart] - Change cart quantity', payload: product });
    }

    const removeCartProduct = ( product: ICartProduct ) => {
        dispatch({ type: '[Cart] - Remove product in cart', payload: product });
    }

    const removeCart = () => {
            dispatch({ type: '[Cart] - Order complete' });
            dispatch({ type: '[Cart] - LoadCart from cookies | storage', payload: [] });
    }

    const updateAddress = ( address: ShippingAddress ) => {
        Cookie.set('firstName',address.firstName);
        Cookie.set('lastName',address.lastName);
        Cookie.set('address',address.address);
        Cookie.set('address2',address.address2 || '');
        Cookie.set('zip',address.zip);
        Cookie.set('city',address.city);
        Cookie.set('country',address.country);
        Cookie.set('phone',address.phone);

        dispatch({ type: '[Cart] - Update Address', payload: address });
    }

    const createOrder = async ():Promise<{ hasError: boolean; message: string; }> => {

        const body: IOrder = {
            orderItems: state.cart.map( p => ({
                ...p,
                size: p.size!
            })),
            shippingAddress: state.shippingAddress!,
            numberOfItems: state.numberOfItems,
            subTotal: state.subTotal,
            tax: state.tax,
            total: state.total,
            isPaid: false,
            totalBuy: 0,
            shippingPrice: 0,
            codConNum: 0,
            remNum: 0,
            remDat: "",
            invNum: 0,
            invDat: "",
            recNum: 0,
            recDat: "",
            desVal: "",
            notes: "",
            paymentMethod: 0,
        }
        // console.log(body);



        try {
            const {data} = await stutzApi.post('/api/tes/orders', body)
            dispatch({ type: '[Cart] - Order complete' });
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
            dispatch({ type: '[Cart] - Order complete' });
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
        <CartContext.Provider value={{
            ...state,

            // Methods
            addProductToCart,
            addProductToCartEsc,
            addTodosProductToCartEscPar,
            addTodosProductToCartEsc,
            removeCartProduct,
            removeCart,
            updateCartQuantity,
            updateAddress,
            createOrder,
            createParam,
        }}>
            { children }
        </CartContext.Provider>
    )
};