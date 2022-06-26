import { Address } from "./address";
import { HouseDetails } from "./houseDetails";
import { HousePrice } from "./housePrice";
import { HouseReview } from "./houseReview";
import { HouseType } from "./houseType";
import { Image } from "./image";
import { UserProfile } from "./profile";
import { Rent } from "./rent";

export interface House {
    id: string,
    title: string,
    slug: string,
    type: HouseType,
    catchPhrase?: string,
    details: HouseDetails,
    prices: HousePrice[],
    address: Address,
    cover: Image,
    images: Image[],
    owner: UserProfile,
    rents: Rent[],
    requests: Rent[];
    available: Boolean,
    availableFrom?: string,
    creationDate?: string,
    rating: number,
    reviews?: HouseReview[]
}

