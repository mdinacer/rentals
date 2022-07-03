
export interface RentParams {
    pageNumber: number,
    pageSize: number,
    orderBy?: string;
    owner?: string;
    client?: string;
    status?: string,
}

export function getAxiosRentParams(rentParams: RentParams) {
    const params = new URLSearchParams();
    params.append("pageNumber", rentParams.pageNumber.toString());
    params.append("pageSize", rentParams.pageSize.toString());

    if (rentParams.orderBy) {
        params.append("orderBy", rentParams.orderBy);
    }

    if (rentParams.status) {
        params.append("status", rentParams.status);
    }

    if (rentParams.owner) {
        params.append("owner", rentParams.owner);
    }
    if (rentParams.client) {
        params.append("client", rentParams.client);
    }




    return params;
}