import { IConfiguracion, ISupplier, ICategory } from "./";

export interface Ireview
  {
    _id?: string;  
    name: string,
    comment: string,
    rating: number,
    createdAt?: string;
  }



export interface IProduct {
    _id: string;
    codPro: string;
    // codProd: string;
    codigoPro: string;
    title: string;
    medPro: string;
    slug: string;
    ecoActive: boolean;
    images: string[];
    image1: string ;
    image2:  string;
    image3:  string;
    brand:  string;
    category: string;
    id_config?: IConfiguracion | string;
    supplier?: ISupplier | string;
    categoryId?: ICategory | string;
    id_category: string;
    description: string;
    price: number;
    priceBuy: number;
    inStock: number;
    minStock: number;
    porIva: number;
    rating: number;
    numReviews: number;
    reviews: Ireview[],
    tags: string[],
    type: IType;
    gender: 'men'|'women'|'kid'|'unisex'
    sizes: ISize[];




    // TODO: agregar createdAt y updatedAt
    createdAt: string;
    updatedAt: string;


}

export type ISize = 'XS'|'S'|'M'|'L'|'XL'|'XXL'|'XXXL';
export type IType = 'shirts'|'pants'|'hoodies'|'hats';



