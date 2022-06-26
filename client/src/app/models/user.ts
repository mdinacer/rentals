import { UserProfile } from "./profile";

export interface User {
    id: string,
    username: string,
    email: string,
    token: string,
    profile?: UserProfile,
    roles: string[]
}
export interface UserRegister {
    username: string,
    email: string,
    password: string,
}
export interface UserLogin {
    email: string,
    password: string,
}