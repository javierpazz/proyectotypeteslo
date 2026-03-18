import { useEffect, useRef, useState } from 'react';
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
  TableFooter,
} from '@mui/material';
import {  useNavigate } from 'react-router-dom';
import {exportToExcel} from './ExportToExcel';
import { stutzApi } from '../../../api';
import { AdminLayoutMenuList } from '../../components/layouts';
import { CategoryOutlined } from '@mui/icons-material';

interface Movimiento {
  _uid: string;
  fecha: string;
  compDes: string;
  compNum: number;
  descripcion: string;
  total: number;
  totalBuy: number;
  saldoAcumulado: number;
}

interface Cuenta {
  _uid: string;
  id_client: string;
  nombreCliente: string;
  movimientos: Movimiento[];  // <-- Aquí agregás movimientos
  saldoTotal: number;
}

export const CajaIngEgrListScreen = () => {

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
        const { data } = await stutzApi.get(`api/receipts/searchcajSB?fech1=${fech1}&fech2=${fech2}&configuracion=${codCon}&usuario=${codUse}&encargado=${codEnc}`,{
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
    navigate('/admin/filtrocrm?redirect=/admin/invoicesCajIngEgr');
  };
  //  const printRef = useRef();
  //  const printRef = useRef<HTMLDivElement | null>(null);
  // const reactToPrintFn = useReactToPrint({ printRef });

  const contentRef = useRef<HTMLDivElement | null>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });


    return (
      <div className="p-1">

    <AdminLayoutMenuList 
        title={`Caja `} 
        subTitle={'Caja'}
        icon={ <CategoryOutlined /> }
    >
            <div className="mb-1">
                <button onClick={parametros} disabled={!(userInfo.role !== "admin")}>
                  🖨️ Ver Filtros
                </button> 
                <button onClick={reactToPrintFn}>🖨️ Print</button>
                <button onClick={() => exportToExcel(cuentas)}>📤 Exporta a Excel</button>

              </div>

      <Box ref={contentRef} p={3}>

        <Typography variant="h5" gutterBottom>
          1.- Caja - Total General: ${saldoTotalGeneral.toFixed(2)}
        </Typography>

        {cuentas.map((cuenta) => (
          <Paper key={cuenta._uid} sx={{ p: 2, mb: 3 }}>
            <Typography variant="h6" color="primary" gutterBottom>
              {cuenta.nombreCliente}
            </Typography>

            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Fecha</TableCell>
                  <TableCell>Comprobante</TableCell>
                  <TableCell>Numero</TableCell>
                  <TableCell>Descripcion</TableCell>
                  <TableCell align="right">Ingresos</TableCell>
                  <TableCell align="right">Egresos</TableCell>
                  <TableCell align="right">Saldo Acumulado</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cuenta.movimientos.map((mov) => (
                  // <TableRow key={`${idx}-${mov.co_uidmpNum}`}>
                  <TableRow key={`${mov._uid}`}>
                    <TableCell>{mov.fecha.substring(0, 10)}</TableCell>
                    <TableCell>{mov.compDes}</TableCell>
                    <TableCell>{mov.compNum}</TableCell>
                    <TableCell>{mov.descripcion}</TableCell>
                    <TableCell align="right">${mov.total.toFixed(2)}</TableCell>
                    <TableCell align="right">${mov.totalBuy.toFixed(2)}</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                      ${mov.saldoAcumulado.toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={6}><strong>Saldo Total</strong></TableCell>
                  <TableCell align="right">
                    ${cuenta.saldoTotal.toFixed(2)}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </Paper>
        ))}
        {/* </div> */}
      </Box>
    </AdminLayoutMenuList>

      </div>
    );
  };


