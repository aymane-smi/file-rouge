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
    Login(email: $email, password:$password)
}
`;