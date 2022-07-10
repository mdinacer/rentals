import { HouseType } from "./houseType";

export interface HouseParams {
    pageNumber: number,
    pageSize: number,
    orderBy: string;
    province?: string,
    city?: string,
    rooms?: number,
    minPrice?: number,
    maxPrice?: number,
    type?: HouseType,
    pool?: boolean,
    // parking?: boolean,
    // pets?: boolean,
}


export function getAxiosHouseParams(houseParams: HouseParams) {
    const params = new URLSearchParams();
    params.append("pageNumber", houseParams.pageNumber.toString());
    params.append("pageSize", houseParams.pageSize.toString());
    if (houseParams.orderBy) {
        params.append("orderBy", houseParams.orderBy);
    }


    if (houseParams.province) {
        params.append("address.province", houseParams.province);
    }
    else {
        params.delete("address.province");
    }

    if (houseParams.city) {
        params.append("address.city", houseParams.city);
    }
    else {
        params.delete("address.city");
    }

    if (houseParams.rooms && houseParams.rooms > 0) {
        params.append("details.rooms", houseParams.rooms.toString());
    }
    else {
    }

    if (houseParams.minPrice && houseParams.minPrice > 0) {
        params.append("minPrice", houseParams.minPrice.toString());
    }
    else {
        params.delete("minPrice");
    }

    if (houseParams.maxPrice && houseParams.maxPrice > 0) {
        params.append("maxPrice", houseParams.maxPrice.toString());
    }
    else {
        params.delete("maxPrice");
    }

    if (houseParams.type) {
        params.append("type", houseParams.type);
    } else {
        params.delete("type");
    }

    // if (houseParams.pool) {
    //     params.append("pool", houseParams.pool.toString());
    // }



    return params;
}