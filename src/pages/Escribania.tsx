import { useContext, useEffect } from "react";
import { AuthContext } from "../../context";
import { useNavigate } from "react-router-dom";
import { AdminLayoutMenuEsc } from "../components/layouts";
import { CategoryOutlined } from "@mui/icons-material";
import foto from '../assets/fondo.jpg';


export const Escribania = () => {


    ////////////////////FGFGFGFG
    const { user, isLoading } = useContext(AuthContext);
    const navigate = useNavigate()

    useEffect(() => {
        if ((!user && !isLoading) || user?.role === "client" ) {
        navigate('/auth/loginadm?redirect=/');
        }
      }, [user, isLoading, navigate]);
    ////////////////////FGFGFGFG

      localStorage.setItem('modulo', 'escr');








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

    <AdminLayoutMenuEsc 
        title={`Entredas`} 
        subTitle={'Generando Entredas'}
        icon={ <CategoryOutlined /> }
    >




    </AdminLayoutMenuEsc>
            </div> 

  );
}

