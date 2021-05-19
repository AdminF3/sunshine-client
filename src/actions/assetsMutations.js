import gql from 'graphql-tag';

export const VALIDATE_ASSET = gql`
mutation validateAsset($assetID: ID!, $status: ValidationStatus!, $comment: String) {
    validateAsset(assetID: $assetID, status: $status, comment: $comment) {
        message
    }
}
`;

export const CLAIM_ASSET_RESIDENCY = gql`
mutation claimAssetResidency($assetID: ID!) {
    claimAssetResidency(assetID: $assetID) {
        message
    }
}
`;
