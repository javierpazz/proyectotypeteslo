import { IConfiguracion, ICustomer, ISupplier, IUser, IComprobante, IOrderItem, ShippingAddress } from './';

export interface IInvoice {

    _id? : string;
    user?: IUser | string;
    codCus?: ICustomer | string;
    codCon?: IConfiguracion | string;
    codCon2?: IConfiguracion | string;
    codCom?: IComprobante | string;
    codSup?: ISupplier | string;
    orderItems: IOrderItem[];
    shippingAddress: ShippingAddress;
    paymentResult?: string;

    numberOfItems: number;
    subTotal     : number;
    tax          : number;
    total        : number;
    totalBuy     : number;
    shippingPrice: number;
    codConNum    : string;
    remNum?       : number;
    remDat?       : string;
    movpvNum?       : number;
    movpvDat?       : string;
    dueDat?       : string;
    invNum?       : number;
    invDat?       : string;
    recNum?       : number;
    recDat?       : string;
    desVal?       : string;
    notes?       : string;
    paymentMethod: string;
    isHaber?    : boolean;
    geRem?    : boolean;
    salbuy?    : string;

    libNum? : number;
    folNum? : number;
    asiNum? : number;
    asiDat? : string;
    escNum? : number;
    asieNum? : number;
    asieDat? : string;
    terminado? : boolean;

    isPaid? : boolean;
    paidAt? : string;

    transactionId?: string;


    createdAt?: string;
    updatedAt?: string;
}

