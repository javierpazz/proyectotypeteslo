import { useContext, useEffect } from "react";
import { AuthContext } from "../../context";
import { useNavigate } from "react-router-dom";
import { AdminLayoutMenu } from "../components/layouts";
import { CategoryOutlined } from "@mui/icons-material";
import foto from '../assets/escribania.jpg';


export const Blanco = () => {


    ////////////////////FGFGFGFG
    const { user, isLoading } = useContext(AuthContext);
    const navigate = useNavigate()

    useEffect(() => {
        if (!user && !isLoading) {
        navigate('/auth/loginadm?redirect=/admin/invoices');
        }
        if (user?.role === "client" ) {
        navigate('/');
        }
      }, [user, isLoading, navigate]);
    ////////////////////FGFGFGFG









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

    <AdminLayoutMenu 
        title={`Entredas`} 
        subTitle={'Generando Entredas'}
        icon={ <CategoryOutlined /> }
    >




    </AdminLayoutMenu>
            </div> 

  );
}

