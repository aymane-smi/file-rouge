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