export interface Payment {
    id: string,
    creationDate: string,
    paymentDate: string,
    amount: number,
    type: string,
    received: boolean
}