import { gql } from '@apollo/client';

export const GET_ME = gql`
  query Me($username: String!) {
    me(username: $username) {
      username
      _id
      bookCount
      email
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;