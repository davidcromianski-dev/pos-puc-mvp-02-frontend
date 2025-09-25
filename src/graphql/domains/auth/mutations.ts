import { gql } from "@apollo/client";

export const LOGIN = gql`
mutation Login(
  $username: String!, 
  $password: String!
) {
  login(loginData: {username: $username, password: $password}) {
    accessToken
  }
}
`;

export const REGISTER = gql`
mutation Register(
  $username: String! = "ash",
  $password: String! = "pikachu",
  $email: String! = "ash@mail.com"
) {
  register(
    userData: {username: $username, password: $password, email: $email}
  ) {
    accessToken
  }
}
`;
