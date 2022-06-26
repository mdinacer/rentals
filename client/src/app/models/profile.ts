import { Address } from "./address";

export interface UserProfile {
    firstName: string,
    lastName: string,
    fullName: string,
    address: Address,
    phone: string,
    mobile: string,
    email: string,
    image: string,
    user: string
}

export interface UserProfileCreate {
    firstName: string,
    lastName: string,
    address?: string,
    phone?: string,
    mobile: string,
}