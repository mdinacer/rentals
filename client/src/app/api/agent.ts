import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { history } from "../..";
import { House } from "../models/house";
import { HouseReview } from "../models/houseReview";
import { PaginatedResponse } from "../models/pagination";
import { Rent } from "../models/rent";
import { User } from "../models/user";
import { store } from "../store/configureStore";


const sleep = () => new Promise(resolve => setTimeout(resolve, 1000));

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
//axios.defaults.withCredentials = true;

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.request.use(config => {
    const token = store.getState().account.user?.token;
    if (token && config.headers) {
        config.headers["x-auth-token"] = `${token}`;
    }
    return config;
});

axios.interceptors.response.use(async response => {

    if (process.env.NODE_ENV === "development") {
        await sleep();
    }

    const pagination = response.headers["pagination"];


    if (pagination) {
        response.data = new PaginatedResponse(response.data, JSON.parse(pagination));
        return response;
    }

    return response;
}, (error: AxiosError<any, any>) => {
    if (error.response) {
        const { data, status } = error.response;

        switch (status) {
            case 400:
                if (data.errors) {
                    const modelStateErrors: string[] = [];
                    for (const key in data.errors) {
                        if (data.errors[key]) {
                            modelStateErrors.push(data.errors[key])
                        }
                    }
                    throw modelStateErrors.flat();
                }
                toast.error(data.title)
                break;

            case 401:
                toast.error(data.title)
                break;

            case 403:
                toast.error("You are not allowed")
                break;

            // case 404:
            //     history.push('/not-found', data);
            //     break;

            case 500:
                history.push('/server-error', data);
                break;

            default:
                break;
        }
    }
    return Promise.reject(error.response);
})

const requests = {
    get: <T>(url: string, params?: URLSearchParams) => axios.get<T>(url, { params }).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    patch: <T>(url: string, body: {}) => axios.patch<T>(url, body).then(responseBody),
    delete: <T>(url: string, body?: {}) => axios.delete<T>(url, body).then(responseBody),
    postForm: (url: string, data: FormData) => axios.post(url, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }).then(responseBody),
    putForm: (url: string, data: FormData) => axios.put(url, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }).then(responseBody),
}

function createFormData(item: any) {
    let formData = new FormData();
    for (const key in item) {
        formData.append(key, item[key])
    }
    return formData
}

// function buildFormData(formData: any, data: any, parentKey?: any) {
//     if (
//         data &&
//         typeof data === 'object' &&
//         !(data instanceof Date) &&
//         !(data instanceof File)
//     ) {
//         Object.keys(data).forEach((key) => {
//             buildFormData(
//                 formData,
//                 data[key],
//                 parentKey ? `${parentKey}.${key}` : key
//             );
//         });
//     } else {
//         const value = data == null ? '' : data;

//         formData.append(parentKey, value);
//     }
// }

// function jsonToFormData(data: any) {
//     const formData = new FormData();

//     buildFormData(formData, data);

//     return formData;
// }

const Account = {
    login: (values: any) => requests.post<User>('auth/', values),
    register: (values: any) => requests.postForm('users/', createFormData(values)),
    currentUser: () => requests.get<User>('auth/me'),
}

const Houses = {
    list: (params: URLSearchParams) => requests.get<House[]>('houses', params),
    listByUser: () => requests.get<House[]>('houses/me'),
    details: (slug: string) => requests.get<House>(`houses/${slug}`),
    create: (house: any) => requests.postForm(`houses/`, house),
    update: (id: string, house: any) => requests.putForm(`houses/${id}`, house),
    delete: (id: string) => requests.delete<void>(`houses/${id}`),
    addFav: (id: string) => requests.put(`houses/${id}/fav`, {}),
}

const Reviews = {
    list: (houseId: string, params?: URLSearchParams) => requests.get<HouseReview[]>(`reviews/${houseId}`, params),
    listByUser: (params?: URLSearchParams) => requests.get<HouseReview[]>('reviews/me'),
    create: (houseId: string, review: any) => requests.post(`reviews/${houseId}`, review),
    update: (id: string, review: any) => requests.put<House>(`reviews/${id}`, review),
    delete: (id: string) => requests.delete<void>(`reviews/${id}`),
}

const Rents = {
    list: (houseId: string, params?: URLSearchParams) => requests.get<HouseReview[]>(`rents/${houseId}`, params),
    getActiveRequest: (houseId: string) => requests.get<Rent>(`rents/${houseId}/active`),
    create: (houseId: string, rent: any) => requests.post(`rents/${houseId}`, rent),
    update: (id: string, rent: any) => requests.put(`rents/${id}`, rent),
    acceptRequest: (id: string, status: any) => requests.put(`rents/${id}/accept`, status),
    cancelRequest: (id: string, status: any) => requests.put(`rents/${id}/cancel`, status),
    delete: (id: string) => requests.delete<void>(`rents/${id}`),
}

const Location = {
    getLocation: (lat: number, long: number) => axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${long}&format=json`,
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, withCredentials: false }).then(responseBody),
}

const agent = {
    Account,
    Houses,
    Location,
    Rents,
    Reviews
}

export default agent;