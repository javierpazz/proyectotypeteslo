import { useState, useEffect, useContext } from 'react';
import { AttachMoneyOutlined, CreditCardOffOutlined, CreditCardOutlined, DashboardOutlined, GroupOutlined, CategoryOutlined, CancelPresentationOutlined, ProductionQuantityLimitsOutlined, AccessTimeOutlined } from '@mui/icons-material';

import { AdminLayoutMenu } from '../../components/layouts'
import { Grid } from '@mui/material'
import { SummaryTile } from '../../components/admin'
import { DashboardSummaryResponse } from '../../interfaces';
import { stutzApi } from '../../../api';
import { AuthContext } from '../../../context';
import { useNavigate } from 'react-router-dom';



export const Dashboard = () => {
    const [ data, setData ] = useState<DashboardSummaryResponse | null>(null);

    // const { data, erro<DashboardSummaryResponse>r } = useSWR<DashboardSummaryResponse>('/api/admin/dashboard', {
    //     refreshInterval: 30 * 1000 // 30 segundos
    // });

    ////////////////////FGFGFGFG
    const { user, isLoading } = useContext(AuthContext);
    const navigate = useNavigate()

    useEffect(() => {
        if (!user && !isLoading) {
        navigate('/auth/loginadm?redirect=/');
        }
        if (user?.role === "client" ) {
        if (window.confirm('Faltan Completar Datos')) {}
        navigate('/');
        }
        if (user?.role === "user" ) {
        if (window.confirm('Faltan Completar Datos')) {}
        navigate('/');
        }
    }, [user, isLoading, navigate]);
    ////////////////////FGFGFGFG




    const loadData = async() => {
        try {
          const resp = await stutzApi.get<DashboardSummaryResponse>('/api/tes/admin');
          setData(resp.data);
        } catch (error) {
          console.log({error})
        }
    
      }

    const [refreshIn, setRefreshIn] = useState(30);

    useEffect(() => {
        loadData();
        }, [])
      

    useEffect(() => {
      const interval = setInterval(()=>{
        // console.log('Tick');
        setRefreshIn( refreshIn => refreshIn > 0 ? refreshIn - 1: 30 );
        refreshIn === 30 && loadData();
      }, 1000 );
    
      return () => clearInterval(interval)
    }, []);
    

    
    



    if ( !data ) {
        return <></>
    }



    const {
        numberOfOrders,
        paidOrders,
        numberOfClients,
        numberOfProducts,
        productsWithNoInventory,
        lowInventory,
        notPaidOrders,
    } = data!;


  return (
    <AdminLayoutMenu
        title='Dashboard'
        subTitle='Estadisticas generales'
        icon={ <DashboardOutlined /> }
    >
        
        <Grid container spacing={2}>
            
            <SummaryTile 
                title={ numberOfOrders }
                subTitle="Ordenes totales"
                icon={ <CreditCardOutlined color="secondary" sx={{ fontSize: 40 }} /> }
            />

            <SummaryTile 
                title={ paidOrders }
                subTitle="Ordenes pagadas"
                icon={ <AttachMoneyOutlined color="success" sx={{ fontSize: 40 }} /> }
            />

            <SummaryTile 
                title={ notPaidOrders }
                subTitle="Ordenes pendientes"
                icon={ <CreditCardOffOutlined color="error" sx={{ fontSize: 40 }} /> }
            />

            <SummaryTile 
                title={ numberOfClients }
                subTitle="Clientes"
                icon={ <GroupOutlined color="primary" sx={{ fontSize: 40 }} /> }
            />

            <SummaryTile 
                title={ numberOfProducts }
                subTitle="Productos"
                icon={ <CategoryOutlined color="warning" sx={{ fontSize: 40 }} /> }
            />

            <SummaryTile 
                title={ productsWithNoInventory }
                subTitle="Sin existencias"
                icon={ <CancelPresentationOutlined color="error" sx={{ fontSize: 40 }} /> }
            />

            <SummaryTile 
                title={ lowInventory }
                subTitle="Bajo inventario"
                icon={ <ProductionQuantityLimitsOutlined color="warning" sx={{ fontSize: 40 }} /> }
            />

            <SummaryTile 
                title={ refreshIn }
                subTitle="Actualización en:"
                icon={ <AccessTimeOutlined color="secondary" sx={{ fontSize: 40 }} /> }
            />

        </Grid>


    </AdminLayoutMenu>
  )
}
