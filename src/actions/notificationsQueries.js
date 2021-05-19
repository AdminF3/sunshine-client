import gql from 'graphql-tag';

export const GET_LIST_NOTIFICATIONS = gql`
  query {
    listNotifications {
      ID
      action
      userID
      userKey
      targetID
      targetKey
      targetType
      old
      new
      seen
      country
      comment
      date
    }
  }
`;

export const SEE_NOTIFICATION = gql`
  mutation seeNotification($notificationID: ID!) {
    seeNotification(notificationID: $notificationID) {
      message
    }
  }
`;

export const GET_NOTIFICATION = gql`
  query getNotification($notificationID: ID!) {
    getNotification(notificationID: $notificationID) {
      ID
      action
      userID
      userKey
      targetID
      targetKey
      targetType
      old
      new
      seen
      country
      comment
      date
    }
  }
`;

export const GET_NOTIFICATIONS_LISTING = gql`
  query getNotificationsListing($first: Int, $cursor: String, $userID: ID, $action: [UserAction!]!, $seen: Boolean, $country: String) {
    notificationListing(first: $first, after: $cursor, userID: $userID, action: $action, seen: $seen, country: $country) {
      edges {
        node {
          ID
          action
          userID
          userKey
          targetID
          targetType
          targetKey
          old
          new
          seen
          country
          comment
          date
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
      totalCount
    }
  }
`;
