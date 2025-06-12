export interface IProduct {
    _id: string;
    codPro: string;
    codProd: string;
    codigoPro: string;
    description: string;
    images: string[];
    inStock: number;
    minStock: number;
    price: number;
    porIva: number;
    medPro: string;
    category: string;
    sizes: ISize[];
    slug: string;
    tags: string[];
    title: string;
    type: IType;
    gender: 'men'|'women'|'kid'|'unisex'


    // TODO: agregar createdAt y updatedAt
    createdAt: string;
    updatedAt: string;


}

export type ISize = 'XS'|'S'|'M'|'L'|'XL'|'XXL'|'XXXL';
export type IType = 'shirts'|'pants'|'hoodies'|'hats';



