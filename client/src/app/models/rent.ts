export interface Rent {
    id: string;
    client: string,
    owner: string,
    house: string,
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

