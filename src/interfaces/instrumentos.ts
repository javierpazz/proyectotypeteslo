import { ISize } from './';


export interface IParamItem {
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



export interface IInstrumento {
    _id: string;
    codIns: string;
    name: string;
    publico     : boolean;

    paramItems: IParamItem[];

    // TODO: agregar createdAt y updatedAt
    createdAt: string;
    updatedAt: string;


}




