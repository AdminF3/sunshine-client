import gql from 'graphql-tag';

export const ASSIGN_PORTFOLIO_ROLE = gql`
  mutation AssignPortfolioRole($userID: ID!, $country: String!, $role: PortfolioRole!) {
    addPortfolioRole(userID:$userID, country:$country, role:$role) {
      message
    }
  }
`;

export const REMOVE_PORTFOLIO_ROLE = gql`
  mutation RemovePortfolioRole($userID: ID!, $country: String!, $role: PortfolioRole!) {
    removePortfolioRole(userID:$userID, country:$country, role:$role) {
      message
    }
  }
`;

export const ASSIGN_COUNTRY_ADMIN = gql`
  mutation AddCountryAdmin($userID: ID!, $country: String!) {
    addCountryAdmin(uid: $userID, country: $country) {
      message
    }
  }
`;

export const REMOVE_COUNTRY_ADMIN = gql`
  mutation RemoveCountryAdmin($userID: ID!, $country: String!) {
    removeCountryAdmin(uid: $userID, country: $country) {
      message
    }
  }
`;

export const VALIDATE_USER = gql`
  mutation validateUser($userID: ID!, $status: ValidationStatus!, $comment: String) {
    validateUser(userID: $userID, status: $status, comment: $comment) {
      message
    }
  }
`;

export const ADD_ADMIN_NW_MANAGER = gql`
  mutation addAdminNetworkManager($userID: ID!) {
    addAdminNetworkManager(uid: $userID) {
      message
    }
  }
`;

export const REMOVE_ADMIN_NW_MANAGER = gql`
  mutation removeAdminNetworkManager($userID: ID!) {
    removeAdminNetworkManager(uid: $userID) {
      message
    }
  }
`;
