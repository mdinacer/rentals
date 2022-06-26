import { UserProfile } from "./profile";

export interface HouseReview {
    host: UserProfile,
    rating: number,
    creationDate: string,
    lastUpdate: string,
    body?: string
}