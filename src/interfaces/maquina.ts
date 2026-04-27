import { ICustomer } from "./customer";

export interface IMaquina {
    _id: string;
    codMaq: string;
    name: string;
    serNum: string;
    codCus?: ICustomer | string;
  
    // TODO: agregar createdAt y updatedAt
    createdAt: string;
    updatedAt: string;


}




