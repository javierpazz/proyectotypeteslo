import { useContext, useEffect, useReducer, useRef, useState } from 'react';
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { useReactToPrint } from "react-to-print";
import {
  Button,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
// import {exportToExcel} from './';
import { stutzApi } from '../../../api';
import { AuthContext } from '../../../context';


export const CajaIngEgrListScreen = () => {

  

  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const page = sp.get('page') || 1;
    const { user, isLoading } = useContext(AuthContext);

    useEffect(() => {
        if (!user && !isLoading) {
        navigate('/auth/loginadm?redirect=/admin/reciptspv');
        }
      }, [user, isLoading, navigate]);
    ////////////////////FGFGFGFG
    const userInfo = typeof window !== 'undefined' && localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo')!)
    : null;

  const [id_config, setId_config] = useState(userInfo.codCon);

  const [show, setShow] = useState(false);
  const [recNum, setRecNum] = useState('');
  const [recDat, setRecDat] = useState('');
  const [userId, setUserId] = useState('');

    const contentRef = useRef<HTMLDivElement | null>(null);
    const reactToPrintFn = useReactToPrint({ contentRef });
  


  const fech1 = userInfo.filtro.firstDat;
  const fech2 = userInfo.filtro.lastDat;
  const codCon = userInfo.filtro.codCon;
  const codEnc = userInfo.filtro.codEnc;
  const codUse = userInfo.filtro.codUse;
  const [cuentas, setCuentas] = useState<any>([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await stutzApi.get(`/api/receipts/searchcajSB?fech1=${fech1}&fech2=${fech2}&configuracion=${codCon}&usuario=${codUse}&encargado=${codEnc}`,{
          headers: { Authorization: `Bearer ${userInfo.token}` },
      });
        setCuentas(data.resultado);
        console.log(data);
      } catch (err) {
      }
    };
      fetchData();
  }, [page, userInfo]);



  const saldoTotalGeneral = cuentas.reduce(
    (acc:any, cliente:any) => acc + cliente.saldoTotal,
    0
  );
  



  const parametros = async () => {
    navigate('/admin/filtroscrm?redirect=/admin/invoicesCajIngEgr');
  };
   const printRef = useRef();
  
    const exportToExcel = (cuentas:any) => {
      const wb = XLSX.utils.book_new();
    
      // 1. Crear hojas por cliente
      cuentas.forEach((cuenta:any) => {
        const data = cuenta.movimientos.map((mov:any) => ({
          Fecha: new Date(mov.fecha).toLocaleDateString(),
          Ingresos: mov.totalBuy,
          Egresos: mov.total,
          "Saldo Acumulado": mov.saldoAcumulado,
        }));
    
        const ws = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(wb, ws, cuenta.nombreCliente.slice(0, 31));
      });
    
      // 2. Crear hoja de resumen
      const resumenData = cuentas.map((cuenta:any) => ({
        Cliente: cuenta.nombreCliente,
        "Saldo Final": cuenta.saldoTotal.toFixed(2),
      }));
    
      const totalGeneral = cuentas.reduce((acc:any, c:any) => acc + c.saldoTotal, 0);
    
      resumenData.push({ Cliente: "TOTAL GENERAL", "Saldo Final": totalGeneral.toFixed(2) });
    
      const resumenSheet = XLSX.utils.json_to_sheet(resumenData);
      XLSX.utils.book_append_sheet(wb, resumenSheet, "Resumen");
    
      // 3. Exportar
      const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const blob = new Blob([wbout], { type: "application/octet-stream" });
      saveAs(blob, `informe_caja_${new Date().toISOString().slice(0, 10)}.xlsx`);
    };
    



    return (
      <div className="p-1">
            {/* Botón para imprimir */}
            <div className="mb-1">
              <ReactToPrint
                trigger={() => (
                  <Button>
                    Imprimir o Descargar PDF
                  </Button>
                )}
                content={() => printRef.current}
                documentTitle="Informe_Caja"
                pageStyle="@page { size: auto; margin: 20mm; } body { font-family: Arial; }"
              />
            <Button
              onClick={() => exportToExcel(cuentas)}>
              Exportar a Excel
            </Button>
                <Button type="button"
                        onClick={parametros}
                        disabled={!userInfo.isAdmin}
                        >
                  Ver Filtros
                </Button>
              </div>

        {/* Contenido que se imprime */}

        <div ref={printRef}>
          <div className="p-4 space-y-10">
            <h1 className="text-2xl font-bold mb-6">
              Consulta Caja - Total General: ${saldoTotalGeneral.toFixed(2)}
            </h1>
  
            {cuentas.map((cuenta:any) => (
              <div key={cuenta.id_client} className="border rounded-xl p-4 shadow-md">
                <h2 className="text-xl font-semibold text-blue-700 mb-4">
                  {cuenta.nombreCliente}
                </h2>
  
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-2 border">Fecha</th>
                      <th className="p-2 border">Comprobante</th>
                      <th className="p-2 border">Numero</th>
                      <th className="p-2 border">Descripcion</th>
                      <th className="p-2 border">Ingresos</th>
                      <th className="p-2 border">Egresos</th>
                      <th className="p-2 border">Saldo Acumulado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cuenta.movimientos.map((mov:any, index:any) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="p-2 border">{mov.fecha.substring(0, 10)}</td>
                        <td className="p-2 border">{mov.compDes}</td>
                        <td className="p-2 border text-end">{mov.compNum}</td>
                        <td className="p-2 border">{mov.descripcion}</td>
                        <td className="p-2 border text-end">${mov.total.toFixed(2)}</td>
                        <td className="p-2 border text-end">${mov.totalBuy.toFixed(2)}</td>
                        <td className="p-2 border text-end font-semibold">${mov.saldoAcumulado.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-gray-100 font-bold">
                      <td className="p-2 border" colSpan={6}>Saldo Total</td>
                      <td className="p-2 border text-end">${cuenta.saldoTotal.toFixed(2)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };


