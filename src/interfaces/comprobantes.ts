export interface IComprobante {
    _id: string;
    codCom: string;
    codComt: string;
    nameCom: string;
    claCom: string;
    isHaber: boolean;
    noDisc: boolean;
    toDisc: boolean;
    itDisc: boolean;
    interno: boolean;
    numInt: number;
    codCon: string;


    // TODO: agregar createdAt y updatedAt
    createdAt: string;
    updatedAt: string;


}



