import gql from 'graphql-tag';

export const GET_DPOS = gql`
  query getDPOs($country: String) {
    getDPOs(country: $country) {
      ID
      name
      email
      address
      avatar
      identity
      telephone
      superUser
      platformManager
      adminNwManager
      country
      isActive
      status
      countryRoles {
        ID
        country
        user
        role
      }
    }
  }
`;
