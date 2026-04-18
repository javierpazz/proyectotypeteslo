import { useState, useEffect } from 'react';
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
import { FullScreenLoading } from '../../components/ui';
import { BiFileFind } from 'react-icons/bi';


interface Summary {
  customers: { numCustomers: number }[];
  users: { numUsers: number }[];
  orders: { numOrders: number; totalSales: number }[];
  dailyOrders: { _id: string; sales: number; buys: number }[];
  dailyMoney: { _id: string; inputs: number; outputs: number }[];
  ctacteSale: { _id: string; salesS: number; inputsS: number; salesB: number; inputsB: number }[];
  ctacteBuy: { _id: string; salesS: number; inputsS: number; salesB: number; inputsB: number }[];
  producIO: { _id: string; entro: number; salio: number }[];
  productCategories: { _id: string; count: number }[];

  top10PVentas: { pventa: string; totalSales: number }[];
  top10PVentasBuy: { pventa: string; totalBuys: number }[];
  top10Clients: { customer: string; totalSales: number }[];
  top10Suppliers: { supplier: string; totalBuys: number }[];
  top10Users: { user: string; totalSales: number }[];
  top10UsersBuy: { user: string; totalBuys: number }[];
  top10Categorias: { categoria: string; total: number }[];
  top10CategoriasBuy: { categoria: string; total: number }[];
  top10Productos: { nombre: string; total: number }[];
  top10ProductosBuy: { nombre: string; total: number }[];
  // top10Partes: { parte: string; totalSales: number }[];
  // PubPri: { type: string; total: number }[];
  // PubPriVal: { type: string; total: number }[];
  // dilVal: { _id: string; total: number }[];
  // inster: { _id: string; count: number }[];
  // insterVal: { _id: string; total: number }[];
  // dilter: { _id: string; count: number }[];
}



export const Dashboard = () => {



  const navigate = useNavigate()

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



  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await stutzApi.get<Summary>(`/api/orders/summary?fech1=${fech1}&fech2=${fech2}&configuracion=${codCon}&usuario=${codUse}&customer=${codCus}&supplier=${codSup}&comprobante=${codCom}`, {
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
    navigate('/admin/filtrocrm?redirect=/admin/dashboard');
  };





    if ( !summary ) return <FullScreenLoading/>


  return (
    <AdminLayoutMenu
        title='Dashboard'
        subTitle='Estadisticas generales'
        icon={ <DashboardOutlined /> }
    >

      <Typography variant="h4" gutterBottom>
        Dashboard
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
                  <Typography>Facturas</Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={6} md={3}>
              <Card>
                <CardContent>
                  <Typography variant="h5">
                    ${summary.orders?.[0]?.totalSales?.toFixed(2) || 0}
                  </Typography>
                  <Typography>Importe</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>



          {/* Ejemplo de gráfico */}
          <Grid container spacing={2} sx={{ mt: 2 }}>
            

            <Grid item xs={6} md={4}>
              <Card>
                <CardContent>
                  <Chart
                    width="100%"
                    height="250px"
                    chartType="PieChart"
                    loader={<div>Cargando...</div>}
                    data={[
                      ["PVenta", "Ventas"],
                      ...(summary.top10PVentas || []).map((x) => [
                        x.pventa,
                        x.totalSales,
                      ]),
                    ]}
                    options={{
                      title: "Top 10 Ventas P.Venta",
                      is3D: true,
                    }}
                  />
                </CardContent>
              </Card>
            </Grid>


            <Grid item xs={6} md={4}>
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
                      title: "Top 10 Ventas Clientes",
                      is3D: true,
                    }}
                  />
                </CardContent>
              </Card>
            </Grid>


            <Grid item xs={6} md={4}>
              <Card>
                <CardContent>
                  <Chart
                    width="100%"
                    height="250px"
                    chartType="PieChart"
                    loader={<div>Cargando...</div>}
                    data={[
                      ["Usuarios", "Ventas"],
                      ...(summary.top10Users || []).map((x) => [
                        x.user,
                        x.totalSales,
                      ]),
                    ]}
                    options={{
                      title: "Top 10 Ventas Usuarios",
                      is3D: true,
                    }}
                  />
                </CardContent>
              </Card>
            </Grid>


            <Grid item xs={6} md={4}>
              <Card>
                <CardContent>
                  <Chart
                    width="100%"
                    height="250px"
                    chartType="PieChart"
                    loader={<div>Cargando...</div>}
                    data={[
                      ["PVenta", "Compras"],
                      ...(summary.top10PVentasBuy || []).map((x) => [
                        x.pventa,
                        x.totalBuys,
                      ]),
                    ]}
                    options={{
                      title: "Top 10 Compras P.Venta",
                      is3D: true,
                    }}
                  />
                </CardContent>
              </Card>
            </Grid>


            <Grid item xs={6} md={4}>
              <Card>
                <CardContent>
                  <Chart
                    width="100%"
                    height="250px"
                    chartType="PieChart"
                    loader={<div>Cargando...</div>}
                    data={[
                      ["Proveedores", "Compras"],
                      ...(summary.top10Suppliers || []).map((x) => [
                        x.supplier,
                        x.totalBuys,
                      ]),
                    ]}
                    options={{
                      title: "Top 10 Compras Proveedores",
                      is3D: true,
                    }}
                  />
                </CardContent>
              </Card>
            </Grid>


            <Grid item xs={6} md={4}>
              <Card>
                <CardContent>
                  <Chart
                    width="100%"
                    height="250px"
                    chartType="PieChart"
                    loader={<div>Cargando...</div>}
                    data={[
                      ["Usuarios", "Compras"],
                      ...(summary.top10UsersBuy || []).map((x) => [
                        x.user,
                        x.totalBuys,
                      ]),
                    ]}
                    options={{
                      title: "Top 10 Compras Usuarios",
                      is3D: true,
                    }}
                  />
                </CardContent>
              </Card>
            </Grid>




            {/* Categorías */}
            <Grid item xs={6} md={4}>
              <Card>
                <CardContent>
                  <Chart
                    width="100%"
                    height="250px"
                    chartType="PieChart"
                    loader={<div>Cargando...</div>}
                    data={[
                      ["Categoría", "Productos"],
                      ...(summary.productCategories || []).map((x) => [
                        x._id,
                        x.count,
                      ]),
                    ]}
                    options={{
                      title: "Categorías",
                      is3D: true,
                    }}
                  />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={6} md={4}>
              <Card>
                <CardContent>
                  <Chart
                    width="100%"
                    height="250px"
                    chartType="PieChart"
                    loader={<div>Cargando...</div>}
                    data={[
                      ["Categoria", "Ventas"],
                      ...(summary.top10Categorias || []).map((x) => [
                        x.categoria,
                        x.total,
                      ]),
                    ]}
                    options={{
                      title: "Top 10 Ventas x Categorias Sin IVA",
                      is3D: true,
                    }}
                  />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={6} md={4}>
              <Card>
                <CardContent>
                  <Chart
                    width="100%"
                    height="250px"
                    chartType="PieChart"
                    loader={<div>Cargando...</div>}
                    data={[
                      ["Categoria", "Ventas"],
                      ...(summary.top10CategoriasBuy || []).map((x) => [
                        x.categoria,
                        x.total,
                      ]),
                    ]}
                    options={{
                      title: "Top 10 Compras x Categorias Sin IVA",
                      is3D: true,
                    }}
                  />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={6} md={4}>
              <Card>
                <CardContent>
                  <Chart
                    width="100%"
                    height="250px"
                    chartType="PieChart"
                    loader={<div>Cargando...</div>}
                    data={[
                      ["Producto", "Ventas"],
                      ...(summary.top10Productos || []).map((x) => [
                        x.nombre,
                        x.total,
                      ]),
                    ]}
                    options={{
                      title: "Top 10 Ventas x Producto Sin IVA",
                      is3D: true,
                    }}
                  />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={6} md={4}>
              <Card>
                <CardContent>
                  <Chart
                    width="100%"
                    height="250px"
                    chartType="PieChart"
                    loader={<div>Cargando...</div>}
                    data={[
                      ["Producto", "Ventas"],
                      ...(summary.top10ProductosBuy || []).map((x) => [
                        x.nombre,
                        x.total,
                      ]),
                    ]}
                    options={{
                      title: "Top 10 Compras x Producto Sin IVA",
                      is3D: true,
                    }}
                  />
                </CardContent>
              </Card>
            </Grid>



          </Grid>

          <Grid container spacing={2} sx={{ mt: 2 }}>
            {/* Ventas y Compras */}
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Chart
                    width="100%"
                    height="300px"
                    chartType="LineChart"
                    loader={<div>Cargando...</div>}
                    data={[
                      ["Día", "$ Ventas", "$ Compras"],
                      ...(summary.dailyOrders || []).map((x) => [
                        x._id,
                        x.sales,
                        x.buys,
                      ]),
                    ]}
                    options={{
                      title: "Ventas y Compras",
                      curveType: "function",
                      legend: { position: "bottom" },
                    }}
                  />
                </CardContent>
              </Card>
            </Grid>

            {/* Flujo de Dinero */}
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Chart
                    width="100%"
                    height="300px"
                    chartType="LineChart"
                    loader={<div>Cargando...</div>}
                    data={[
                      ["Día", "$ Cobros", "$ Pagos"],
                      ...(summary.dailyMoney || []).map((x) => [
                        x._id,
                        x.inputs,
                        x.outputs,
                      ]),
                    ]}
                    options={{
                      title: "Flujo de Dinero (Cobros y Pagos)",
                      curveType: "function",
                      legend: { position: "bottom" },
                    }}
                  />
                </CardContent>
              </Card>
            </Grid>

            {/* Ventas y Cobros */}
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Chart
                    width="100%"
                    height="300px"
                    chartType="LineChart"
                    loader={<div>Cargando...</div>}
                    data={[
                      ["Día", "$ Ventas", "$ Cobros"],
                      ...(summary.ctacteSale|| []).map((x) => [
                        x._id,
                        x.salesS,
                        x.inputsS,
                      ]),
                    ]}
                    options={{
                      title: "Ventas y Cobros",
                      curveType: "function",
                      legend: { position: "bottom" },
                    }}
                  />
                </CardContent>
              </Card>
            </Grid>

            {/* Compras y Pagos */}
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Chart
                    width="100%"
                    height="300px"
                    chartType="LineChart"
                    loader={<div>Cargando...</div>}
                    data={[
                      ["Día", "$ Compras", "$ Pagos"],
                      ...(summary.ctacteBuy || []).map((x) => [
                        x._id,
                        x.salesB,
                        x.inputsB,
                      ]),
                    ]}
                    options={{
                      title: "Compras y Pagos",
                      curveType: "function",
                      legend: { position: "bottom" },
                    }}
                  />
                </CardContent>
              </Card>
            </Grid>

            {/* Recepción y Entregas */}
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Chart
                    width="100%"
                    height="300px"
                    chartType="LineChart"
                    loader={<div>Cargando...</div>}
                    data={[
                      ["Día", "Compras", "Ventas"],
                      ...(summary.producIO || []).map((x) => [
                        x._id,
                        x.entro,
                        x.salio,
                      ]),
                    ]}
                    options={{
                      title: "Compras y Ventas de Productos",
                      curveType: "function",
                      legend: { position: "bottom" },
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
