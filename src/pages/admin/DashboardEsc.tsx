import { useState, useEffect, useContext } from 'react';
import {DashboardOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

import { AdminLayoutMenu } from '../../components/layouts'
// import { Grid } from '@mui/material'
// import { SummaryTile } from '../../components/admin'
// import { DashboardSummaryResponse } from '../../interfaces';
// import { stutzApi } from '../../../api';

import Chart from 'react-google-charts';

import {  Grid, Card, CardContent, Typography, Box, Button } from "@mui/material";

import { stutzApi } from '../../../api';
import { AuthContext } from '../../../context';
import { FullScreenLoading } from '../../components/ui';
import { BiFileFind } from 'react-icons/bi';


interface Summary {
  customers: { numCustomers: number }[];
  users: { numUsers: number }[];
  orders: { numOrders: number; totalSales: number }[];
  dailyOrders: { _id: string; sales: number; buys: number }[];
  dailyMoney: { _id: string; inputs: number; outputs: number }[];
  ctacte: { _id: string; salesS: number; inputsS: number; salesB: number; inputsB: number }[];
  producIO: { _id: string; entro: number; salio: number }[];
  productCategories: { _id: string; count: number }[];

  top10UsersSTVal: { user: string; totalSales: number; totalOrders: number }[];
  top10Clients: { customer: string; totalSales: number; totalOrders: number }[];
  top10Partes: { parte: string; totalSales: number; totalOrders: number }[];
  PubPriVal: { type: string; total: number; totalcont: number }[];
  dilVal: { _id: string; total: number; totalCan: number  }[];
  insterVal: { _id: string; total: number; count: number }[];
}



export const DashboardEsc = () => {



    ////////////////////FGFGFGFG
    const { user, isLoading } = useContext(AuthContext);
    const navigate = useNavigate()

    useEffect(() => {
        if (!user && !isLoading) {
        navigate('/auth/loginadm?redirect=/');
        }
        if (user?.role === "client" ) {
        if (window.confirm('Usuario Sin Autorizacion')) {}
        navigate('/');
        }
        if (user?.role === "user" ) {
        if (window.confirm('Usuario Sin Autorizacion')) {}
        navigate('/');
        }
    }, [user, isLoading, navigate]);
    ////////////////////FGFGFGFG

    const userInfo = typeof window !== 'undefined' && localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo')!)
    : null;

  const [summary, setSummary] = useState<Summary | null>(null);

  const fech1 = userInfo.filtro.firstDat;
  const fech2 = userInfo.filtro.lastDat;
  const codCon = userInfo.filtro.codCon;
  const codCus = userInfo.filtro.codCus;
  const codUse = userInfo.filtro.codUse;

  const codSup = userInfo.filtro.codSup;
  const codIns = userInfo.filtro.codIns;
  const codPar = userInfo.filtro.codPar;
  const codMaq = userInfo.filtro.codMaq;
  const codEnc = userInfo.filtro.codEnc;



  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await stutzApi.get<Summary>(`/api/orders/summary/esc?fech1=${fech1}&fech2=${fech2}&configuracion=${codCon}&usuario=${codUse}&customer=${codCus}&supplier=${codSup}&instru=${codIns}&parte=${codPar}&maquina=${codMaq}&encargado=${codEnc}`, {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          });
        setSummary(data);
        } catch (error) {
          console.log({error})
        }
    };
    fetchData();
  }, []);



  const parametros = async () => {
    navigate('/admin/filtro?redirect=/admin/dashboardesc');
  };




    if ( !summary ) return <FullScreenLoading/>


  return (
    <AdminLayoutMenu
        title='Dashboard'
        subTitle='Estadisticas generales'
        icon={ <DashboardOutlined /> }
    >

      <Typography variant="h4" gutterBottom>
        Dashboard Esc
      </Typography>

        <>
          <Grid container spacing={2}>


            <Grid item xs={6} md={2}>
                <Box mt={4} ml={10} display="flex" gap={6} flexWrap="wrap">
                  <Button
                    onClick={parametros}
                    variant="contained"
                    startIcon={<BiFileFind />}
                    sx={{  bgcolor: 'secondary.main' , color: 'white' }}
                  >
                    Filtro
                  </Button>
                </Box>
            </Grid>


            <Grid item xs={6} md={2}>
              <Card>
                <CardContent>
                  <Typography variant="h5">
                    {summary.customers?.[0]?.numCustomers || 0}
                  </Typography>
                  <Typography>Clientes</Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={6} md={2}>
              <Card>
                <CardContent>
                  <Typography variant="h5">
                    {summary.users?.[0]?.numUsers || 0}
                  </Typography>
                  <Typography>Usuarios</Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={6} md={3}>
              <Card>
                <CardContent>
                  <Typography variant="h5">
                    {summary.orders?.[0]?.numOrders || 0}
                  </Typography>
                  <Typography>Entradas</Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={6} md={3}>
              <Card>
                <CardContent>
                  <Typography variant="h5">
                    ${summary.orders?.[0]?.totalSales?.toFixed(2) || 0}
                  </Typography>
                  <Typography>Valor</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>



          {/* Ejemplo de gráfico */}
          <Grid container spacing={2} sx={{ mt: 2 }}>

            <Grid item xs={6} md={3}>
              <Card>
                <CardContent>
                  <Chart
                    width="100%"
                    height="250px"
                    chartType="PieChart"
                    loader={<div>Cargando...</div>}
                    data={[
                      ["Usuarios", "Ventas"],
                      ...(summary.top10UsersSTVal || []).map((x) => [
                        x.user,
                        x.totalOrders,
                      ]),
                    ]}
                    options={{
                      title: "Instrumentos s/Terminar x Usuarios Cantidad",
                      is3D: true,
                    }}
                  />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={6} md={3}>
              <Card>
                <CardContent>
                  <Chart
                    width="100%"
                    height="250px"
                    chartType="PieChart"
                    loader={<div>Cargando...</div>}
                    data={[
                      ["Usuarios", "Ventas"],
                      ...(summary.top10UsersSTVal || []).map((x) => [
                        x.user,
                        x.totalSales,
                      ]),
                    ]}
                    options={{
                      title: "Instrumentos s/Terminar x Usuarios Valorizado",
                      is3D: true,
                    }}
                  />
                </CardContent>
              </Card>
            </Grid>

            

            <Grid item xs={6} md={3}>
              <Card>
                <CardContent>
                  <Chart
                    width="100%"
                    height="250px"
                    chartType="PieChart"
                    loader={<div>Cargando...</div>}
                    data={[
                      ["Instrumentos", "cantidad"],
                      ...(summary.PubPriVal || []).map((x) => [
                        x.type,
                        x.totalcont,
                      ]),
                    ]}
                    options={{
                      title: "Cantidad Instrumentos",
                      is3D: true,
                    }}
                  />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={6} md={3}>
              <Card>
                <CardContent>
                  <Chart
                    width="100%"
                    height="250px"
                    chartType="PieChart"
                    loader={<div>Cargando...</div>}
                    data={[
                      ["Instrumentos", "importe"],
                      ...(summary.PubPriVal || []).map((x) => [
                        x.type,
                        x.total,
                      ]),
                    ]}
                    options={{
                      title: "Valores Instrumentos",
                      is3D: true,
                    }}
                  />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={6} md={3}>
              <Card>
                <CardContent>
                  <Chart
                    width="100%"
                    height="250px"
                    chartType="PieChart"
                    loader={<div>Cargando...</div>}
                    data={[
                      ["Instrumentos", "estado"],
                      ...(summary.insterVal || []).map((x) => [
                        x._id,
                        x.count,
                      ]),
                    ]}
                    options={{
                      title: "Estado Instrumentos",
                      is3D: true,
                    }}
                  />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} md={3}>
              <Card>
                <CardContent>
                  <Chart
                    width="100%"
                    height="250px"
                    chartType="PieChart"
                    loader={<div>Cargando...</div>}
                    data={[
                      ["Instrumentos", "estado"],
                      ...(summary.insterVal || []).map((x) => [
                        x._id,
                        x.total,
                      ]),
                    ]}
                    options={{
                      title: "Estado Instrumentos Valorizado",
                      is3D: true,
                    }}
                  />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={6} md={3}>
              <Card>
                <CardContent>
                  <Chart
                    width="100%"
                    height="250px"
                    chartType="PieChart"
                    loader={<div>Cargando...</div>}
                    data={[
                      ["Instrumentos", "estado"],
                      ...(summary.dilVal || []).map((x) => [
                        x._id,
                        x.totalCan,
                      ]),
                    ]}
                    options={{
                      title: "Cantidad Diligencias",
                      is3D: true,
                    }}
                  />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={6} md={3}>
              <Card>
                <CardContent>
                  <Chart
                    width="100%"
                    height="250px"
                    chartType="PieChart"
                    loader={<div>Cargando...</div>}
                    data={[
                      ["Instrumentos", "estado"],
                      ...(summary.dilVal || []).map((x) => [
                        x._id,
                        x.total,
                      ]),
                    ]}
                    options={{
                      title: "Valores Diligencias",
                      is3D: true,
                    }}
                  />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={6} md={3}>
              <Card>
                <CardContent>
                  <Chart
                    width="100%"
                    height="250px"
                    chartType="PieChart"
                    loader={<div>Cargando...</div>}
                    data={[
                      ["Partes", "Orders"],
                      ...(summary.top10Partes || []).map((x) => [
                        x.parte,
                        x.totalOrders,
                      ]),
                    ]}
                    options={{
                      title: "Top 10 Partes",
                      is3D: true,
                    }}
                  />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={6} md={3}>
              <Card>
                <CardContent>
                  <Chart
                    width="100%"
                    height="250px"
                    chartType="PieChart"
                    loader={<div>Cargando...</div>}
                    data={[
                      ["Partes", "Ventas"],
                      ...(summary.top10Partes || []).map((x) => [
                        x.parte,
                        x.totalSales,
                      ]),
                    ]}
                    options={{
                      title: "Top 10 Partes Valorizado",
                      is3D: true,
                    }}
                  />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={6} md={3}>
              <Card>
                <CardContent>
                  <Chart
                    width="100%"
                    height="250px"
                    chartType="PieChart"
                    loader={<div>Cargando...</div>}
                    data={[
                      ["Clientes", "Orders"],
                      ...(summary.top10Clients || []).map((x) => [
                        x.customer,
                        x.totalOrders,
                      ]),
                    ]}
                    options={{
                      title: "Top 10 Clientes",
                      is3D: true,
                    }}
                  />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} md={3}>
              <Card>
                <CardContent>
                  <Chart
                    width="100%"
                    height="250px"
                    chartType="PieChart"
                    loader={<div>Cargando...</div>}
                    data={[
                      ["Clientes", "Ventas"],
                      ...(summary.top10Clients || []).map((x) => [
                        x.customer,
                        x.totalSales,
                      ]),
                    ]}
                    options={{
                      title: "Top 10 Clientes Valorizado",
                      is3D: true,
                    }}
                  />
                </CardContent>
              </Card>
            </Grid>



          </Grid>
        </>

    </AdminLayoutMenu>
  )
}
