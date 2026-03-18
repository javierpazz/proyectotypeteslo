import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

// export default function exportToExcel(cuentas) {

interface Movimiento {
  fecha: string;
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


export const exportToExcel = (cuentas: Cuenta[]) => {  
      const wb = XLSX.utils.book_new();
    
      // 1. Crear hojas por cliente
      cuentas.forEach((cuenta) => {
        const data = cuenta.movimientos.map((mov) => ({
          Fecha: new Date(mov.fecha).toLocaleDateString(),
          Ingresos: mov.totalBuy,
          Egresos: mov.total,
          "Saldo Acumulado": mov.saldoAcumulado,
        }));
    
        const ws = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(wb, ws, cuenta.nombreCliente.slice(0, 31));
      });
    
      // 2. Crear hoja de resumen
      const resumenData = cuentas.map((cuenta) => ({
        Cliente: cuenta.nombreCliente,
        "Saldo Final": cuenta.saldoTotal.toFixed(2),
      }));
    
      const totalGeneral = cuentas.reduce((acc, c) => acc + c.saldoTotal, 0);
    
      resumenData.push({ Cliente: "TOTAL GENERAL", "Saldo Final": totalGeneral.toFixed(2) });
    
      const resumenSheet = XLSX.utils.json_to_sheet(resumenData);
      XLSX.utils.book_append_sheet(wb, resumenSheet, "Resumen");
    
      // 3. Exportar
      const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const blob = new Blob([wbout], { type: "application/octet-stream" });
      saveAs(blob, `informe_caja_${new Date().toISOString().slice(0, 10)}.xlsx`);
    };
    