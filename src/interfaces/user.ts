
export interface IUser {
    _id      : string;
    name     : string;
    email    : string;
    password: string;
    role     : string;
    isAdmin    :boolean;
    isActive    :boolean;
    puede       :boolean;
    resetTocken?: string;
    createdAt?: string;
    updatedAt?: string;
}