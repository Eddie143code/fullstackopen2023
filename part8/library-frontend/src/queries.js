import { gql } from "@apollo/client";

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

export const ALL_BOOKS = gql`
  query AllBooks {
    allBooks {
      genres
      id
      published
      title
      author {
        name
        born
        bookCount
        id
      }
    }
  }
`;

export const ADD_BOOK = gql`
  mutation AddBook(
    $title: String!
    $published: Int!
    $author: String!
    $genres: [String!]
  ) {
    addBook(
      title: $title
      published: $published
      author: $author
      genres: $genres
    ) {
      author
      genres
      id
      published
      title
    }
  }
`;

export const EDIT_AUTHOR = gql`
  mutation EditAuthor($setBornTo: Int!, $name: String!) {
    editAuthor(setBornTo: $setBornTo, name: $name) {
      bookCount
      born
      id
      name
    }
  }
`;

export const USER_LOGIN = gql`
  mutation userLogin($username: String!) {
    login(username: $username) {
      value
    }
  }
`;
