import { FC, useReducer, useEffect, ReactNode } from 'react';
import { AuthContext, authReducer } from './';
import Cookies from 'js-cookie';
import axios from 'axios';

import { stutzApi } from '../../api';
import { IUser } from '../../src/interfaces';
import { useNavigate } from 'react-router-dom';

export interface AuthState {
    isLoggedIn: boolean;
    user?: IUser;
}

interface Props {
    children?: ReactNode;
}


const AUTH_INITIAL_STATE: AuthState = {
    isLoggedIn: false,
    user: undefined,
}

export const AuthProvider:FC<Props> = ({ children }) => {
    const navigate = useNavigate()

    const [state, dispatch] = useReducer( authReducer, AUTH_INITIAL_STATE );

    useEffect(() => {
        checkToken();
    }, [])

    const checkToken = async() => {

        if ( !Cookies.get('token') ) {
            return;
        }

        try {
            const { data } = await stutzApi.get('/user/validate-token');
            const { token, user } = data;
            Cookies.set('token', token );
            dispatch({ type: '[Auth] - Login', payload: user });
        } catch (error) {
            Cookies.remove('token');
        }
    }
    


    const loginUser = async( email: string, password: string ): Promise<boolean> => {

        try {
            const { data } = await stutzApi.post('/user/login', { email, password });
            const { token, user } = data;
            Cookies.set('token', token );
            dispatch({ type: '[Auth] - Login', payload: user });
            return true;
        } catch (error) {
            return false;
        }

    }


    const registerUser = async( name: string, email: string, password: string ): Promise<{hasError: boolean; message?: string}> => {
        try {
            const { data } = await stutzApi.post('/user/register', { name, email, password });
            const { token, user } = data;
            Cookies.set('token', token );
            dispatch({ type: '[Auth] - Login', payload: user });
            return {
                hasError: false
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
                message: 'No se pudo crear el usuario - intente de nuevo'
            }
        }
    }

    const logout = () => {
        Cookies.remove('token');
        Cookies.remove('cart');
        // router.reload();
        navigate('/')
        window.location.reload();
    }


    return (
        <AuthContext.Provider value={{
            ...state,

            // Methods
            loginUser,
            registerUser,
            logout,

        }}>
            { children }
        </AuthContext.Provider>
    )
};