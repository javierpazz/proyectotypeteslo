import { useContext, useEffect } from "react";
import { AuthContext } from "../../context";
import { useNavigate } from "react-router-dom";
import { AdminLayoutMenuEco } from "../components/layouts";
import { CategoryOutlined } from "@mui/icons-material";
import foto from '../assets/fondocrm.jpg';


export const Ecomm = () => {


    ////////////////////FGFGFGFG
    const { user, isLoading } = useContext(AuthContext);
    const navigate = useNavigate()

    useEffect(() => {
        if ((!user && !isLoading) || user?.role === "client" ) {
        navigate('/auth/loginadm?redirect=/');
        }
      }, [user, isLoading, navigate]);
    ////////////////////FGFGFGFG


      localStorage.setItem('modulo', 'ecom');






  return (
    //   <main>
 <div
            style={{
            backgroundImage: `url(${foto})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            minHeight: '100vh',
            }}
        >

    <AdminLayoutMenuEco 
        title={`Entredas`} 
        subTitle={'Generando Entredas'}
        icon={ <CategoryOutlined /> }
    >




    </AdminLayoutMenuEco>
            </div> 

  );
}

