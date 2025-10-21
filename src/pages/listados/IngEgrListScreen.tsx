import {  useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';

import {
  Box,
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableFooter
} from '@mui/material';

import {  useNavigate } from 'react-router-dom';
import {exportToExcel} from './ExportToExcel';
import { stutzApi } from '../../../api';
import { AdminLayoutMenuList } from '../../components/layouts';
import { CategoryOutlined } from '@mui/icons-material';

interface Movimiento {
  _uid: string;
  fecha: string;
  nameCus: string;
  nameCon: string;
  compDes: string;
  compNum: number;
  descripcion: string;
  total: number;
  totalBuy: number;
  saldoAcumulado: number;
}

interface Cuenta {
  id_client: string;
  nombreCliente: string;
  movimientos: Movimiento[];  // <-- Aquí agregás movimientos
  saldoTotal: number;
}



export const IngEgrListScreen = () => {

  const navigate = useNavigate();

  const userInfo = typeof window !== 'undefined' && localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo')!)
  : null;



  
  const fech1 = userInfo.filtro.firstDat;
  const fech2 = userInfo.filtro.lastDat;
  const codCon = userInfo.filtro.codCon;
  const codEnc = userInfo.filtro.codEnc;
  const codUse = userInfo.filtro.codUse;
  // const [cuentas, setCuentas] = useState([]);
  const [cuentas, setCuentas] = useState<Cuenta[]>([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await stutzApi.get(`api/receipts/searchingegrSB?fech1=${fech1}&fech2=${fech2}&configuracion=${codCon}&usuario=${codUse}&encargado=${codEnc}`,{
          headers: { Authorization: `Bearer ${userInfo.token}` },
      });
        setCuentas(data.resultado);
      } catch (err) {
      }
    };
      fetchData();
  }, []);



  const saldoTotalGeneral = cuentas.reduce(
    (acc, cliente) => acc + cliente.saldoTotal,
    0
  );
  



  const parametros = async () => {
    navigate('/admin/filtrocrm?redirect=/admin/informe/IngEgr');
  };

  const contentRef = useRef<HTMLDivElement | null>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  
    return (
      <div className="p-1">
    <AdminLayoutMenuList 
        title={`Caja `} 
        subTitle={'Caja'}
        icon={ <CategoryOutlined /> }
    >


            {/* Botón para imprimir */}
            <div className="mb-1">
            <div className="mb-1">
                <button onClick={parametros} disabled={!(userInfo.role !== "admin")}>
                  🖨️ Ver Filtros
                </button> 
                <button onClick={reactToPrintFn}>🖨️ Print</button>
                <button onClick={() => exportToExcel(cuentas)}>📤 Exporta a Excel</button>

              </div>

              </div>

        {/* Contenido que se imprime */}
        {/* <div ref={printRef}> */}
        <Box ref={contentRef} p={3}>
        

<Box p={4}>
  <Typography variant="h5" fontWeight={700} mb={3}>
    2.- Consulta Ingresos / Retiros Caja - Total General: ${saldoTotalGeneral.toFixed(2)}
  </Typography>

  {cuentas.map((cuenta) => (
    <Paper
      key={cuenta.id_client}
      sx={{
        p: 3,
        mb: 5,
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography variant="h6" color="primary" fontWeight={600} mb={2}>
        {cuenta.nombreCliente}
      </Typography>

      <Table size="small">
        <TableHead>
          <TableRow sx={{ bgcolor: 'grey.100' }}>
            <TableCell>Fecha</TableCell>
            <TableCell>Comprobante</TableCell>
            <TableCell>Numero</TableCell>
            <TableCell>Usuario</TableCell>
            <TableCell>Pto.Venta</TableCell>
            <TableCell align="right">Ingresos</TableCell>
            <TableCell align="right">Egresos</TableCell>
            <TableCell align="right">Saldo Acumulado</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {cuenta.movimientos.map((mov) => (
            <TableRow key={mov._uid} hover>
              <TableCell>{mov.fecha?.substring(0, 10)}</TableCell>
              <TableCell>{mov.compDes}</TableCell>
              <TableCell align="right">{mov.compNum}</TableCell>
              <TableCell>{mov.nameCus}</TableCell>
              <TableCell>{mov.nameCon}</TableCell>
              <TableCell align="right">${mov.total.toFixed(2)}</TableCell>
              <TableCell align="right">${mov.totalBuy.toFixed(2)}</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>
                ${mov.saldoAcumulado.toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

        <TableFooter>
          <TableRow sx={{ bgcolor: 'grey.100', fontWeight: 700 }}>
            <TableCell colSpan={7}>Saldo Total</TableCell>
            <TableCell align="right">
              ${cuenta.saldoTotal.toFixed(2)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </Paper>
  ))}
</Box>
        {/* </div> */}
      </Box>
</AdminLayoutMenuList>
      </div>
    );
  };


