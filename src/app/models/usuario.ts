import { Address } from "./address";
import { Company } from "./company";


export interface Usuario {
    id:number,
    name: string,
    username: string,
    email: string,
    phone: string,
    address: Address,
    website: string,
    company: Company
}
