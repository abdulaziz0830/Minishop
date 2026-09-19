export interface ILogin {
    username: string;
    password: string;
}
export interface IRegister {
    username: string;
    email: string;
    password: string;
    password2: string;
}
export interface IProfile {
    id: number;
    username: string;
    email: string;
    avatar: string;
    password?: string;
}
export interface IChangeProfile {
    username: string;
    email: string;
    avatar?: string;
    password: string;
}
export interface IProduct {
    id: number;
    title: string;
    price: number;
    description: string;
    image: string;
    amount: number;
    rating:number;
    quantity?: number;  
}
export interface Option {
    value: string;
    label: string;
}