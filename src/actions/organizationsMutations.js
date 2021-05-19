import gql from 'graphql-tag';

export const CREATE_MEETING = gql`
    mutation CreateMeeting($meeting: CreateMeeting!) {
        createMeeting(meeting: $meeting) {
            ID
        }
    }
`;

export const UPDATE_MEETING = gql`
    mutation UpdateMeeting($meeting: UpdateMeeting!) {
        updateMeeting(meeting: $meeting){
            ID
            name
            host {
                ID
                name
            }
            project {
                ID
                name
            }
            location
            date
            objective
            guests {
                name
                type
                email
                organization
                phone
            }
            stakeholder
            stage
            actions_taken
            next_contact
            notes
            topic
            attachments {
                ID
                name
                content_type
                created_at
                size
            }
            internalProject
        }
    }
`;

export const DELETE_MEETING = gql`
    mutation DeleteMeeting($id: ID!) {
        deleteMeeting(id: $id) {
            message
        }
    }
`;

export const ADD_PORTFOLIO_DIRECTOR = gql`
    mutation AddPortfolioDirector($user: ID!, $country: String!) {
        addPortfolioDirector(user:$user, country:$country) {
            message
        }
    }
`;

export const ASSIGN_ROLE = gql`
    mutation addOrganizationRole($orgID: ID!, $userID: ID!, $role: OrganizationRole!) {
        addOrganizationRole(org: $orgID, user: $userID, role: $role) {
            message
        }
    }
`;

export const REMOVE_ROLE = gql`
    mutation removeOrganizationRole($orgID: ID!, $userID: ID!, $role: OrganizationRole!) {
        removeOrganizationRole(org: $orgID, user: $userID, role: $role) {
            message
        }
    }
`;

export const VALIDATE_ORGANIZATION = gql`
    mutation validateOrganization($orgID: ID!, $status: ValidationStatus!, $comment: String) {
        validateOrganization(orgID: $orgID, status: $status, comment: $comment) {
            message
        }
    }
`;

export const REQUEST_MEMBERSHIP_ORG = gql`
    mutation requestOrganizationMembership($organizationID: ID!) {
        requestOrganizationMembership(organizationID: $organizationID) {
            message
        }
    }
`;

export const ACCEPT_LEAR_APPLICATION = gql`
    mutation acceptLEARApplication($userID: ID!, $organizationID: ID!, $comment: String!, $filename: String!, $approved: Boolean!) {
        acceptLEARApplication(userID: $userID, organizationID: $organizationID, comment: $comment, filename: $filename, approved: $approved) {
            message
        }
    }
`;
