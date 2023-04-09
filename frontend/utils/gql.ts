import {gql} from"@apollo/client";

export const getAllRestaurant = gql`
    query{
        getAllRestaurant{
            name,
            id
        }
    }
`;