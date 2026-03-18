import { FC, ReactNode, useContext } from 'react';
import { AuthContext } from '../../../context';

interface Props {
  children?: ReactNode,
}

export const ProtectedRoute :FC<Props> = ({ children }) => {
  const { user } = useContext( AuthContext );
 return user ? children : children;
}




// import { FC, ReactNode, useContext } from 'react';
// import { Navigate } from 'react-router-dom';
// import { AuthContext } from '../../../context';


// interface Props {
//   children?: ReactNode;
// }


// export const ProtectedRoute:FC<Props> = ({ children }) => {

//   const { user } = useContext( AuthContext );


//   return
//   {
//      user 
//         ? (children)
//          : ( <Navigate to="/auth/login*" />)
    
 
//   // return user ? children : ;
// }  
// }


