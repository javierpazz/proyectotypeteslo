import { IConfiguracion, ICustomer, ISupplier, IUser, IEncargado } from './';

export interface IReceipt {
    _id? : string;
    user?: IUser | string;
    codCus?: ICustomer | string;
    codCon?: IConfiguracion | string;
    id_encarg?: IEncargado | string;
    codSup?: ISupplier | string;
    receiptItems: IReceiptItems[];

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
    desVal: string,
    ordNum: number;
    notes: string,
    salbuy: string,
    createdAt?: string;
    updatedAt?: string;
  }

export interface IReceiptItems {
        _id      : string;
        valuee      : string;
        desval: string;
        numval: string;
        amountval: number;
    }
