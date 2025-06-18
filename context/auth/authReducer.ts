import { AuthState } from './';
import { IUser } from '../../src/interfaces';


type AuthActionType = 
   | { type: '[Auth] - Login', payload: IUser } 
   | { type: '[Auth] - Logout' } 


export const authReducer = ( state: AuthState, action: AuthActionType ): AuthState => {

   switch (action.type) {
        case '[Auth] - Login':
            return {
                ...state,
                isLoggedIn: true,
                user: action.payload,
                isLoading: false
            }

        case '[Auth] - Logout':
            return {
                ...state,
                isLoggedIn: false,
                user: undefined,
                isLoading: false,
            }


       default:
          return state;
   }

}