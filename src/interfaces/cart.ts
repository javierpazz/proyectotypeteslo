import { ISize } from './';

export interface ICartProduct {
    _id: string;
    image: string;
    price: number;
    porIva: number;
    medPro: string;
    size?: ISize;
    slug: string;
    title: string;
    gender: 'men'|'women'|'kid'|'unisex';
    quantity: number;
    venDat?: string;
    observ?: string;
    terminado?: boolean;
}


// export interface ICartProduct {
//     _id: string;
//     image: string;
//     price: number;
//     porIva: number;
//     medPro: string;
//     size?: ISize;
//     slug: string;
//     title: string;
//     gender: 'men'|'women'|'kid'|'unisex';
//     quantity: number;
// }
