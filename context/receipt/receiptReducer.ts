

import { ReceiptState } from '.';
import { IReceiptCart } from '../../src/interfaces';

type ReceiptActionType = 
   | { type: '[Receipt] - LoadReceipt from cookies | storage', payload: IReceiptCart[] } 
   | { type: '[Receipt] - Update products in Receipt', payload: IReceiptCart[] }
   | { type: '[Receipt] - Change Receipt quantity', payload: IReceiptCart }
   | { type: '[Receipt] - Remove product in Receipt', payload: IReceiptCart }
   | { 
      type: '[Receipt] - Update order summary', 
      payload: {
         numberOfItems: number;
         subTotal: number;
         // tax: number;
         total: number;
      }
   }
   | { type: '[Receipt] - Order complete' }

export const receiptReducer = ( state: ReceiptState, action: ReceiptActionType ): ReceiptState => {

   switch (action.type) {
      case '[Receipt] - LoadReceipt from cookies | storage':
         return {
            ...state,
            isLoaded: true,
            receipt: [...action.payload]
          }


      case '[Receipt] - Update products in Receipt':
         return {
            ...state,
            receipt: [ ...action.payload ]
         }


      case '[Receipt] - Change Receipt quantity':
         return {
            ...state,
            receipt: state.receipt.map( product => {
               if ( product._id !== action.payload._id ) return product;
               return action.payload;
            })
         }


      case '[Receipt] - Remove product in Receipt':
         return {
            ...state,
            receipt: state.receipt.filter( product => !(product._id === action.payload._id ))
         }

      case '[Receipt] - Update order summary':
         return {
            ...state,
            ...action.payload
         }
   

      case '[Receipt] - Order complete':
               return {
                  ...state,
                  receipt: [],
                  numberOfItems: 0,
                  subTotal: 0,
                  // tax: 0,
                  total: 0
               }
       default:
          return state;
   }

}