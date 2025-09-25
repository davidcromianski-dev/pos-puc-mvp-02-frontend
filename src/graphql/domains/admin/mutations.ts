import { gql } from "@apollo/client";

export const DELETE_USER = gql`
mutation DeleteUser($username: String!) {
  deleteUser(deleteData: {username: $username})
}
`;