import { IConfiguracion, ICustomer, ISupplier, ISize, IUser, IInstrumento, IParte, IComprobante, IEncargado, IValue } from './';

export interface IRecipt {
    _id? : string;
    user?: IUser | string;
    id_client?: ICustomer | string;
    id_instru?: IInstrumento | string;
    id_parte?: IParte | string | undefined;
    id_config?: IConfiguracion | string;
    id_encarg?: IEncargado | string;
    codCom?: IComprobante | string;
    supplier?: ISupplier | string;
    receiptItems: IReceiptItems[];

    subTotal     : number;
    tax          : number;
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

export interface IReceiptItems {
        desval: string;
        numval: number;
        amountval: number;
        value?: IValue | string;
    }
