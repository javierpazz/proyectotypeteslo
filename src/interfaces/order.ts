import { IConfiguracion, ICustomer, ISupplier, ISize, IUser, IInstrumento } from './';

export interface IOrder {

    _id? : string;
    user?: IUser | string;
    id_client?: ICustomer | string;
    id_instru?: IInstrumento | string;
    codCon?: IConfiguracion | string;
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
    codConNum    : number;
    remNum?       : number;
    remDat?       : string;
    dueDat?       : string;
    invNum?       : number;
    invDat?       : string;
    recNum?       : number;
    recDat?       : string;
    desVal?       : string;
    notes?       : string;
    paymentMethod: number;
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


export interface ShippingAddress {
    firstName: string;
    lastName : string;
    address  : string;
    address2?: string;
    zip      : string;
    city     : string;
    country  : string;
    phone    : string;
}