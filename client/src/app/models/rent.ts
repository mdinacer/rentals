import { RentStatus } from "./RentStatus"

export interface Rent {
    client: string,
    owner: string,
    house: string,
    startDate: string,
    endDate: string,
    creationDate: string,
    status: RentStatus,
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

