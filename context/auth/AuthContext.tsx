

import { createContext } from 'react';
import { IUser } from '../../src/interfaces';


interface ContextProps {
    isLoggedIn: boolean;
    user?: IUser;
    isLoading: boolean;
    
    loginUser: (email: string, password: string) => Promise<boolean>;
    loginUserAdm: (email: string, password: string) => Promise<boolean>;
    registerUser: (name: string, email: string, password: string, punto: string) => Promise<{ hasError: boolean; message?: string; }>;
    registerUserAdm: (name: string, email: string, password: string) => Promise<{ hasError: boolean; message?: string; }>;
    logout: () => void;
}


export const AuthContext = createContext({} as ContextProps );