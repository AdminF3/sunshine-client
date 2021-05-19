import gql from 'graphql-tag';

export const LIST_MEETINGS = gql`
    query listMeetings($id: ID!) {
        listMeetings(id: $id) {
            ID
            name
            location
            guests {
                name
                type
                email
                organization
                phone
            }
            date
            topic
            attachments {
                ID
                name
                content_type
                created_at
                size
            }
        }
    }
`;

export const GET_MEETING = gql`
    query getMeeting($id: ID!) {
        getMeeting(mID: $id) {
            ID
            name
            host {
                ID
                name
            }
            location
            date
            objective
            project {
                ID
                name
            }
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

export const LIST_ORGANIZATION_REPORTS = gql`
  query listOrganizationReports($first: Int, $offset: Int) {
    listOrganizationReports(first: $first, offset: $offset) {
        totalCount
        entities {
            ID,
            ...on OrganizationReport {
                ownProjects {
                    totalCount
                    ongoingCount
                    monitoringPhaseCount
                    approvedForfaitingCount
                }
                relatedProjects {
                    totalCount
                    ongoingCount
                    monitoringPhaseCount
                    approvedForfaitingCount
                }
                usersCount
                learEmail
                learName
                name
                vat
                registrationNumber
                address
                telephone
                website
                legalForm
                registered
                valid
                email
            }
        }
    }
  }
`;
