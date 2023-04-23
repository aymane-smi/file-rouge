import {gql} from"@apollo/client";

export const getAllRestaurant = gql`
    query{
        getAllRestaurant{
            name,
            id
        }
    }
`;

export const loginEmployee = gql`
query($email: String!, $password: String!){
    Login(email: $email, password:$password){
        employee{
            id
            email
            first_name
            last_name
            phone
            haveTicket
        }
        token
    }
}
`;
export const loginAdmin = gql`
    query($email: String!, $password: String!){
        AdminLogin(email: $email, password:$password){
            administrator{
                id
                email
                first_name
                last_name
            }
            token
    }
}
`;

export const loginRestaurant = gql`
    query($email: String!, $password: String!){
        RestaurantLogin(email: $email, password:$password){
            restaurant{
                id
                email
                phone
                address
                name
            }
            token
    }
}
`;

export const addRestaurant = gql`
    mutation CreateRestaurant($input: RestaurantInput) {
        createRestaurant(input: $input) {
            id
        }
    }
`;

export const getAllRestaurants = gql`
    query GetAllRestaurant {
        getAllRestaurant {
            email
            id
            name
            phone
            address
        }
    }
`;

export const addComplain = gql`
    mutation Mutation($input: Complain) {
        AddComplain(input: $input)
    }
`;

export const addCategory = gql`
    mutation Mutation($name: String!, $emoji: String!, $restaurant_id: ID!) {
    createCategory(name: $name, emoji: $emoji, restaurant_id: $restaurant_id) {
        id
        name
        emoji
    }
}
`;

export const getAllCategoriesForRestaurant = gql`
query ($id: ID!) {
    getRestaurantById(id: $id) {
        categories {
            id
            name
        }
  }
}
`;

export const getRestaurantMenus = gql`
query GetRestaurantById($id: ID!) {
  getRestaurantById(id: $id) {
    menus {
      id
      image
      name
      available
      category_id
      details{
        id
        portion
        price
      }
    }
  }
}
`;


export const addMenu = gql`
mutation MyMutation($input: MenuInput!){
  createMenu(input: $input) {
    id
    image
    name
    available
  }
}
`;


export const addMenuDetails = gql`
    mutation Mutation($input: MenuDetailsInput) {
    createMenuDetails(input: $input)
    }
`;

export const getMenuEdit = gql`
    query MyQuery ($id: ID!){
    getMenu(id: $id) {
        id
        name
        available
        category_id
    }
}
`;

export const editMenu = gql`
mutation MyMutation($input: EditMenuInput!){
  editMenu(input:$input) {
    id
    name
    available
    category_id
  }
}
`;

export const getRestaurantById = gql`
query MyQuery($id: ID!){
  getRestaurantById(id: $id){
    id
    name
    email
    phone
    address
    categories{
        emoji
        id
        name
        menus{
            available
            name
            image
            id
            details{
                id
                portion
                price
            }
        }
    }
  }
}
`;

export const makeOrder  = gql`
    mutation MyMutation($input: OrderInput!){
  makeOrder(input: $input)
  }
`;

export const deleteMenu = gql`
    mutation MyMutation($id: ID!){
        deleteMenu(id: $id){
            id
            name
        }
    }
`;

export const changeStatus = gql`
    mutation editStatus($id: ID!, $status: Boolean!){
        editMenuStatus(id: $id, available: $status){
            id
            available
        }
    }
`;

export const removeDetail = gql`
    mutation MyMutation($id: ID!){
        DeleteDetail(id: $id)
    }
`;

export const getAllEmployees = gql`
    query{
        getAllEmployee{
            id,
            first_name,
            last_name,
            phone,
            class,
            year,
            email
        }
    }
`;

export const addEmployee = gql`
    mutation MyMutation($input: EmployeeInput!){
        createEmployee(input: $input)
    }
`;


export const getOrder = gql`
    query Query($restaurant_id: ID!){
        getRestaurantOrder(restaurant_id: $restaurant_id){
            id,
            ticket
            first_name
            last_name
            phone
            status
        }
    }
`;

export const changeOrderStatus = gql`
    mutation changeOrderStatus($id: ID!, $status: Int!){
        OrderChangeStatus(id: $id, status: $status)
    }
`;

export const getOrderDetails = gql`
query MyQuery($id: ID!){
  GetDetailsOfOrder(id: $id) {
    menu {
      name
    }
    detail {
      id
      menu_id
      portion
      price
      quantity
    }
  }
}
`;

export const editRestaurant = gql`
    mutation edit($input: EditRestaurant!){
        editRestaurant(input: $input){
            name
            email
            phone
            address
            password
        }
    }
`;

export const editEmployee = gql`
    mutation edit($input: EmployeeEditInput!){
        EditEmployeeByIdResolver(input: $input){
            first_name
            last_name
            email
            phone
            class
            year
        }
    }
`;