import { useContext, useEffect } from "react";
import { AuthContext } from "../../context";
import { useNavigate } from "react-router-dom";
import { AdminLayoutMenuSer } from "../components/layouts";
import { CategoryOutlined } from "@mui/icons-material";
import foto from '../assets/fondoSer.jpg';


export const Servicio = () => {


    ////////////////////FGFGFGFG
    const { user, isLoading } = useContext(AuthContext);
    const navigate = useNavigate()

    useEffect(() => {
        if ((!user && !isLoading) || user?.role === "client" ) {
        navigate('/auth/loginadm?redirect=/');
        }
      }, [user, isLoading, navigate]);
    ////////////////////FGFGFGFG

      localStorage.setItem('modulo', 'serv');








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

    <AdminLayoutMenuSer 
        title={`Entredas`} 
        subTitle={'Generando Entredas'}
        icon={ <CategoryOutlined /> }
    >




    </AdminLayoutMenuSer>
            </div> 

  );
}

