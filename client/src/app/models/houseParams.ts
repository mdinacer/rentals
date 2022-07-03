import { HouseType } from "./houseType";

export interface HouseParams {
    pageNumber: number,
    pageSize: number,
    orderBy: string;
    city?: string,
    rooms?: number,
    minPrice?: number,
    maxPrice?: number,
    type?: HouseType,
    pool?: boolean,
    parking?: boolean,
    pets?: boolean,
}


export function getAxiosHouseParams(houseParams: HouseParams) {
    const params = new URLSearchParams();
    params.append("pageNumber", houseParams.pageNumber.toString());
    params.append("pageSize", houseParams.pageSize.toString());
    if (houseParams.orderBy) {
        params.append("orderBy", houseParams.orderBy);
    }


    if (houseParams.city) {
        params.append("city", houseParams.city);
    }

    if (houseParams.rooms) {
        params.append("rooms", houseParams.rooms.toString());
    }

    if (houseParams.minPrice) {
        params.append("minPrice", houseParams.minPrice.toString());
    }

    if (houseParams.maxPrice) {
        params.append("maxPrice", houseParams.maxPrice.toString());
    }

    if (houseParams.type) {
        params.append("type", houseParams.type);
    }

    if (houseParams.pool) {
        params.append("pool", houseParams.pool.toString());
    }

    if (houseParams.parking) {
        params.append("parking", houseParams.parking.toString());
    }

    if (houseParams.pets) {
        params.append("pets", houseParams.pets.toString());
    }


    return params;
}