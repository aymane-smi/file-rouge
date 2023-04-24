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
};

export type addMenu = {
    name: String,
    image?: File | null,
    available: boolean,
    category: number,
}


export type Menus = {
    image: String,
    name: String,
    id: number,
    available: boolean,
    category_id: string|number
}[];

export type Details = {
    price: [number],
    portion: [string],
}

export type Menu = {
    id: number,
    name: string,
    available: boolean,
    category: number
}

export type cart = {
    id: number,
    name: string,
    image: string
    price: number,
    portion: string,
    quantity: number,
    detail: number,
}[];

export type EmployeeInput = {
    email: string,
    first_name: string
    last_name: string
    phone: string,
    haveTicket: boolean,
    class: string,
    year: string,
    password: string
}

export type orderType = {
    id: string,
    first_name: string
    last_name: string
    phone: string,
    ticket: boolean,
    status: number,
}[]