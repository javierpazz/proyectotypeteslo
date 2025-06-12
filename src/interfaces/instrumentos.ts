import { IOrderItem } from './';

export interface IInstrumento {
    _id: string;
    codIns: string;
    name: string;
    orderItems: IOrderItem[];

    // TODO: agregar createdAt y updatedAt
    createdAt: string;
    updatedAt: string;


}




