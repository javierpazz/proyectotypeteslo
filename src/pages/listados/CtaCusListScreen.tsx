import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { stutzApi } from '../../../api';
import { AdminLayoutMenuList } from '../../components/layouts';
import {
  Box,
  Checkbox,
  FormControlLabel,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
} from '@mui/material';

import { CategoryOutlined } from '@mui/icons-material';
import { useReactToPrint } from 'react-to-print';
import { exportToExcel } from './ExportToExcel';

interface Movimiento {
  fecha: string;
  nameUse: string;
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
  codCust: string;
  nombreCliente: string;
  movimientos: Movimiento[];  // <-- Aquí agregás movimientos
  saldoTotal: number;
}

export const CtaCusListScreen = () => {


  const navigate = useNavigate();

  const userInfo = typeof window !== 'undefined' && localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo')!)
  : null;

  const [isDet, setIsDet] = useState(true);
  
  
  const fech1 = userInfo.filtro.firstDat;
  const fech2 = userInfo.filtro.lastDat;
  const codCon = userInfo.filtro.codCon;
  const codCus = userInfo.filtro.codCus;
  const codUse = userInfo.filtro.codUse;
  const order = userInfo.filtro.order;
  const [cuentas, setCuentas] = useState<Cuenta[]>([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
           const { data } = await stutzApi.get(`api/invoices/ctacus/?configuracion=${codCon}&order=${order}&fech1=${fech1}&fech2=${fech2}&usuario=${codUse}&customer=${codCus}`, {
                headers: { Authorization: `Bearer ${userInfo.token}` },
      });
        setCuentas(data.resultado);
        console.log(data);
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
    navigate('/admin/filtrocrm?redirect=/admin/informe/CtaCus');
  };

  const contentRef = useRef<HTMLDivElement | null>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  
    return (
      <div className="p-1">
    <AdminLayoutMenuList 
        title={`Clientes `} 
        subTitle={'Clientes'}
        icon={ <CategoryOutlined /> }
    >


            {/* Botón para imprimir */}
            <div className="mb-1">
                <button onClick={parametros} disabled={!(userInfo.role !== "admin")}>
                  🖨️ Ver Filtros
                </button> 
                <button onClick={reactToPrintFn}>🖨️ Print</button>
                <button onClick={() => exportToExcel(cuentas)}>📤 Exporta a Excel</button>

            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isDet}
                    onChange={(e) => setIsDet(e.target.checked)}
                    name="isDet"
                  />
                }
                label="Detallado"
              />
            </Typography>


            </div>

        {/* Contenido que se imprime */}
        <Box ref={contentRef} p={3}>
        {(isDet) ? (                
            <Box p={4}>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                3.- Cuenta Corriente Clientes - Total General: ${saldoTotalGeneral.toFixed(2)}
              </Typography>

              {cuentas.map((cuenta: any) => (
                <Paper key={cuenta.id_client} sx={{ mb: 4, p: 2, borderRadius: 2, boxShadow: 2 }}>
                  <Typography variant="h6" color="primary" fontWeight="bold" gutterBottom>
                    {cuenta.nombreCliente}
                  </Typography>

                  <TableContainer>
                    <Table size="small">
                      <TableHead>
                        <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                          <TableCell>Fecha</TableCell>
                          <TableCell>Comprobante</TableCell>
                          <TableCell align="right">Número</TableCell>
                          <TableCell>Usuario</TableCell>
                          <TableCell>Pto. Venta</TableCell>
                          <TableCell align="right">Ingresos</TableCell>
                          <TableCell align="right">Egresos</TableCell>
                          <TableCell align="right">Saldo Acumulado</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {cuenta.movimientos.map((mov: any, index: number) => (
                          <TableRow key={index} hover>
                            <TableCell>{mov.fecha.substring(0, 10)}</TableCell>
                            <TableCell>{mov.compDes}</TableCell>
                            <TableCell align="right">{mov.compNum}</TableCell>
                            <TableCell>{mov.nameCus}</TableCell>
                            <TableCell>{mov.nameCon}</TableCell>
                            <TableCell align="right">${mov.total.toFixed(2)}</TableCell>
                            <TableCell align="right">${mov.totalBuy.toFixed(2)}</TableCell>
                            <TableCell align="right" style={{ fontWeight: 'bold' }}>
                              ${mov.saldoAcumulado.toFixed(2)}
                            </TableCell>
                          </TableRow>
                        ))}
                        <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                          <TableCell colSpan={7} align="right" sx={{ fontWeight: 'bold' }}>
                            Saldo Total
                          </TableCell>
                          <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                            ${cuenta.saldoTotal.toFixed(2)}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              ))}
            </Box>
              ):(
            <Box p={4}>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                3.- Cuenta Corriente Clientes - Total General: ${saldoTotalGeneral.toFixed(2)}
              </Typography>

              {cuentas.map((cuenta: any) => (
                <Paper key={cuenta.id_client} sx={{ mb: 4, p: 2, borderRadius: 2, boxShadow: 2 }}>
                  <Typography variant="h6" color="primary" fontWeight="bold" gutterBottom>
                    {cuenta.nombreCliente}
                  </Typography>

                  <TableContainer>
                    <Table size="small">
                      <TableHead>
                        <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                          <TableCell>Fecha</TableCell>
                          <TableCell>Comprobante</TableCell>
                          <TableCell align="right">Número</TableCell>
                          <TableCell>Usuario</TableCell>
                          <TableCell>Pto. Venta</TableCell>
                          <TableCell align="right">Ingresos</TableCell>
                          <TableCell align="right">Egresos</TableCell>
                          <TableCell align="right">Saldo Acumulado</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {cuenta.movimientos.map((index: number) => (
                          <TableRow key={index} hover>
                          </TableRow>
                        ))}
                        <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                          <TableCell colSpan={7} align="right" sx={{ fontWeight: 'bold' }}>
                            Saldo Total
                          </TableCell>
                          <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                            ${cuenta.saldoTotal.toFixed(2)}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              ))}
            </Box>
              
              )}
        </Box>
        </AdminLayoutMenuList>
        
      </div>
    );
  };


