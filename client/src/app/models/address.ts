export interface Address {
    country: string,
    province: string,
    city: string,
    address1: string,
    address2: string,
    location: location
}

export interface AddressCreate {
    city: string,
    address1: string,
    address2?: string,
    location?: location
}

export interface location {
    long: string,
    lat: string
}

export interface Country {
    name: string,
    provinces: Province[]
}

export interface Province {
    name: string,
    country: string,
    cities: City[]
}

export interface City {
    name: string,
    province: string
}

