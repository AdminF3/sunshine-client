import gql from 'graphql-tag';

export const SEND_GDPR_REQUEST = gql`
    mutation sendGDPRRequest($request: CreateGDPRRequest!) {
        sendGDPRRequest(request: $request) {
            ID
        }
    }
`;
