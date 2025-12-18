import { IConfiguracion, ICustomer, ISupplier, ISize, IUser, IInstrumento, IParte, IComprobante } from './';

export interface IOrder {

    _id? : string;
    user?: IUser | string;
    id_client?: ICustomer | string;
    id_instru?: IInstrumento | string;
    id_parte?: IParte | string | undefined | null;
    id_config?: IConfiguracion | string;
    id_config2?: IConfiguracion | string;
    codCom?: IComprobante | string;
    supplier?: ISupplier | string;
    orderItems: IOrderItem[];
    orderAddress: OrderAddress;
    paymentResult?: string;

    numberOfItems: number;
    itemsInOrder: number;
    subTotal     : number;
    tax          : number;
    total        : number;
    totalBuy     : number;
    shippingPrice: number;
    codConNum    : number;
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
    ordYes?    : string;
    staOrd?     : string;

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



export interface IOrderItem {
    _id      : string;
    codigoPro: string;
    title    : string;
    size     : ISize;
    quantity : number;
    slug     : string;
    image    : string;
    price    : number;
    porIva   : number;
    medPro   : string;
    gender   : string;
    venDat?: string;
    observ?: string;
    terminado?: boolean;

}


export interface OrderAddress {
    firstName: string;
    lastName : string;
    address  : string;
    address2?: string;
    zip      : string;
    city     : string;
    country  : string;
    phone    : string;
}