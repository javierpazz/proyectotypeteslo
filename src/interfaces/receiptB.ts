import { IConfiguracion, ICustomer, ISupplier, IUser, IEncargado, IReceiptCart } from './';

export interface IReceiptB {
    _id? : string;
    user?: IUser | string;
    id_client?: ICustomer | string;
    id_config?: IConfiguracion | string;
    id_encarg?: IEncargado | string;
    supplier?: ISupplier | string;
    codEnc?: IEncargado | string;
    receiptItems: IReceiptCart[];

    subTotal     : number;
    total        : number;
    totalBuy     : number;
    codConNum    : number;
    isPaid: boolean,
    paidAt: string,
    recNum: number;
    recDat: string;
    cajNum: number;
    cajDat: string;
    desval: string,
    ordNum: number;
    notes: string,
    salbuy: string,
    createdAt?: string;
    updatedAt?: string;
  }

