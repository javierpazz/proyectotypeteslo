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
  top10PartesSTVal: { name: string; total: number; count: number }[];
  top10PartesTerVal: { name: string; total: number; count: number }[];
  TarxPar: { producto: string; total: number; totalCan: number }[];
  customers: { numCustomers: number }[];
  users: { numUsers: number }[];
  orders: { numOrders: number; totalSales: number }[];
  dailyOrders: { _id: string; sales: number; buys: number }[];
  top10PartesxOrd: { name: string; total: number; count: number }[];
  top10InstrumentosxPar: { name: string; total: number; count: number }[];
  


  dilVal: { _id: string; total: number; totalCan: number  }[];
}



export const DashboardSerPar = () => {



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

  const codPro = userInfo.filtro.codPro;
  const codIns = userInfo.filtro.codIns;
  const codPar = userInfo.filtro.codPar;
  const codMaq = userInfo.filtro.codMaq;
  const codEnc = userInfo.filtro.codEnc;
  const estado = userInfo.filtro.estado;
  const registro = userInfo.filtro.registro;
  const obser = userInfo.filtro.obser;


  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await stutzApi.get<Summary>(`/api/entradas/summary/par?fech1=${fech1}&fech2=${fech2}&configuracion=${codCon}&usuario=${codUse}&customer=${codCus}&producto=${codPro}&instru=${codIns}&parte=${codPar}&maquina=${codMaq}&encargado=${codEnc}&estado=${estado}&registro=${registro}&obser=${obser}`, {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          });
        setSummary(data);
        console.log(data);
        } catch (error) {
          console.log({error})
        }
    };
    fetchData();
  }, []);



  const parametros = async () => {
    navigate('/admin/filtroser?redirect=/admin/dashboardserpar');
  };




    if ( !summary ) return <FullScreenLoading/>


  return (
    <AdminLayoutMenu
        title='Dashboard'
        subTitle='Estadisticas generales'
        icon={ <DashboardOutlined /> }
    >

      <Typography variant="h4" gutterBottom>
        Dashboard Servicios X Parte Top Ten
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
                  <Typography>Ordenes Trabajo</Typography>
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
                      ["Partes", "Ordenes"],
                      ...(summary.top10PartesSTVal || []).map((x) => [
                        x.name,
                        x.count,
                      ]),
                    ]}
                    options={{
                      title: "Cantidad Ordenes Trabajo sin Terminar x Parte",
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
                      ["Partes", "Valor"],
                      ...(summary.top10PartesSTVal || []).map((x) => [
                        x.name,
                        x.total,
                      ]),
                    ]}
                    options={{
                      title: "Valores Ordenes Trabajo sin Terminar x Parte ",
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
                      ["Partes", "Ordenes"],
                      ...(summary.top10PartesTerVal || []).map((x) => [
                        x.name,
                        x.count,
                      ]),
                    ]}
                    options={{
                      title: "Cantidad Ordenes Trabajo Terminados x Parte",
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
                      ["Partes", "Valor"],
                      ...(summary.top10PartesTerVal || []).map((x) => [
                        x.name,
                        x.total,
                      ]),
                    ]}
                    options={{
                      title: "Valores Ordenes Trabajo Terminados x Parte ",
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
                      title: "Cantidad Tareas Terminadas y Pendientes",
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
                      title: "Valores Tareas Terminadas y Pendientes",
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
                      ...(summary.top10PartesxOrd || []).map((x) => [
                        x.name,
                        x.count,
                      ]),
                    ]}
                    options={{
                      title: "Top 10 Parte x Ordenes de Trabajo",
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
                      ["Partes", "Valores"],
                      ...(summary.top10PartesxOrd || []).map((x) => [
                        x.name,
                        x.total,
                      ]),
                    ]}
                    options={{
                      title: "Top 10 Partes x Ordenes de Trabajo Valorizado",
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
                      ...(summary.top10InstrumentosxPar || []).map((x) => [
                        x.name,
                        x.count,
                      ]),
                    ]}
                    options={{
                      title: "Top 10 Ordenes de Trabajo x Parte",
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
                      ["Partes", "Valores"],
                      ...(summary.top10InstrumentosxPar || []).map((x) => [
                        x.name,
                        x.total,
                      ]),
                    ]}
                    options={{
                      title: "Top 10 Ordenes de Trabajo x Parte Valorizado",
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
                      ["Productos", "Valores"],
                      ...(summary.TarxPar || []).map((x) => [
                        x.producto,
                        x.totalCan,
                      ]),
                    ]}
                    options={{
                      title: "Top 10 Tareas x Parte ",
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
                      ["Productos", "Valores"],
                      ...(summary.TarxPar || []).map((x) => [
                        x.producto,
                        x.total,
                      ]),
                    ]}
                    options={{
                      title: "Top 10 Tareas x Parte  Valorizado",
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
