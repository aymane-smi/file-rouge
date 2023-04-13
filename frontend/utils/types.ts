export type login = {
    email: string,
    password: string
}

export type cardInfo = {
    numberOf: number,
    description: string
}

export type addRestaurant = {
    address: string,
    password: string,
    email: string,
    name: string,
    phone: string,
}

export type claim = {
    description: string,
    image?: File | null,
}