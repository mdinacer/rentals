import { House } from "./house";
import { Payment } from "./payment";
import { UserProfile } from "./profile";
import { User } from "./user";

export interface Rent {
    id: string;
    client: User, //{ id: string, fullName: string, address: string },
    owner: User, //{ id: string, fullName: string, address: string },
    house: House,//{ id: string, title: string, type: string, address: string },
    startDate: string,
    endDate: string,
    creationDate: string,
    status: string,
    price: number,
    paid: number,
    accepted: boolean,
    active?: boolean
    duration?: number
    payments?: Payment[]
}

export interface RentFull {
    id: string;
    client: UserProfile, //{ id: string, fullName: string, address: string },
    owner: UserProfile, //{ id: string, fullName: string, address: string },
    house: { id: string, title: string, type: string, address: string },
    startDate: string,
    endDate: string,
    creationDate: string,
    status: string,
    price: number,
    paid: number,
    accepted: boolean,
    active?: boolean
    duration?: number
}

export interface RentRequestCreate {
    startDate: string,
    endDate: string,
}

