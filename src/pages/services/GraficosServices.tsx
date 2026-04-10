import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { ShopLayout } from '../../components/layouts'
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
  TarxMaq: { producto: string; total: number; totalCan: number }[];
  TarxPar: { producto: string; total: number; totalCan: number }[];
  orders: { numOrders: number; totalSales: number }[];
  // top10Maquinas: { maquina: string; totalSales: number; totalOrders: number }[];
  top10InstrumentosxPar: { instrumento: string; totalSales: number; totalOrders: number }[];
  top10InstrumentosxMaq: { instrumento: string; totalSales: number; totalOrders: number }[];
  


  dilVal: { _id: string; total: number; totalCan: number  }[];
}



export const GraficosServices = () => {



    ////////////////////FGFGFGFG
    const { user, isLoading } = useContext(AuthContext);
    const navigate = useNavigate()

    useEffect(() => {
        if (!user && !isLoading) {
        navigate('/auth/loginadm?redirect=/');
        }
        if (user?.role !== "client" ) {
        if (window.confirm('Usuario Sin Autorizacion')) {}
        navigate('/');
        }
        // if (user?.role === "user" ) {
        // if (window.confirm('Usuario Sin Autorizacion')) {}
        // navigate('/');
        // }
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
  const codCom = userInfo.filtro.codCom;
  const codPar = userInfo.filtro.codPar;
  const codMaq = userInfo.filtro.codMaq;
  const codEnc = userInfo.filtro.codEnc;



  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await stutzApi.get<Summary>(`/api/orders/summary/cli?fech1=${fech1}&fech2=${fech2}&configuracion=${codCon}&usuario=${codUse}&customer=${codCus}&supplier=${codSup}&comprobante=${codCom}&parte=${codPar}&maquina=${codMaq}&encargado=${codEnc}`, {
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
    navigate('/pedidoservices/filtrocli?redirect=/pedidoservices/graficos');
  };




    if ( !summary ) return <FullScreenLoading/>


  return (
    <ShopLayout title={'- Home'} pageDescription={'Encuentra los mejores productos de Teslo aquí'}>

      <Typography variant="h4" gutterBottom>
        Dashboard Clientes Trabajos Realizados
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
                      ["Maquinas", "Orders"],
                      ...(summary.top10InstrumentosxMaq || []).map((x) => [
                        x.instrumento,
                        x.totalOrders,
                      ]),
                    ]}
                    options={{
                      title: "Top 10 Ordenes de Trabajo x Maquinas",
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
                      ["Maquinas", "Valores"],
                      ...(summary.top10InstrumentosxMaq || []).map((x) => [
                        x.instrumento,
                        x.totalSales,
                      ]),
                    ]}
                    options={{
                      title: "Top 10 Ordenes de Trabajo x Maquinas Valorizado",
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
                      ...(summary.TarxMaq || []).map((x) => [
                        x.producto,
                        x.totalCan,
                      ]),
                    ]}
                    options={{
                      title: "Top 10 Tareas x Maquinas ",
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
                      ...(summary.TarxMaq || []).map((x) => [
                        x.producto,
                        x.total,
                      ]),
                    ]}
                    options={{
                      title: "Top 10 Tareas x Maquinas  Valorizado",
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
                        x.instrumento,
                        x.totalOrders,
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
                        x.instrumento,
                        x.totalSales,
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

    </ShopLayout>
  )
}
