import gql from 'graphql-tag';

export const ASSIGN_PLSIGN = gql`
  mutation assignPLSign($projectID: ID!, $userID: ID!) {
    assignPLSign(projectID: $projectID, plsign: $userID) {
      message
    }
  }
`;

export const ASSIGN_PM = gql`
  mutation assignPM($projectID: ID!, $userID: ID!) {
    assignPM(projectID: $projectID, pms: [$userID]) {
      message
    }
  }
`;

export const ASSIGN_ROLE = gql`
  mutation addProjectRole($projectID: ID!, $userID: ID!, $role: ProjectRole!) {
    addProjectRole(project: $projectID, user: $userID, role: $role) {
      message
    }
  }
`;

export const REMOVE_ROLE = gql`
  mutation removeProjectRole($projectID: ID!, $userID: ID!, $role: ProjectRole!) {
    removeProjectRole(project: $projectID, user: $userID, role: $role) {
      message
    }
  }
`;

export const ADVANCE_TO_MILESTONE = gql`
  mutation advanceToMilestone($projectID: ID!, $nextMilestone: Milestone!) {
    advanceToMilestone(projectID: $projectID, nextMilestone: $nextMilestone) {
      message
    }
  }
`;

export const REQUEST_PROJECT_CREATION = gql`
  mutation requestProjectCreation($assetID: ID!, $orgID: ID!) {
    requestProjectCreation(assetID: $assetID, orgID: $orgID) {
      message
    }
  }
`;

export const CREATE_FORFAITING_APPLICATION = gql`
  mutation createForfaitingApplication($forfaitingApplication: CreateForfaitingApplication!) {
    createForfaitingApplication(fa: $forfaitingApplication) {
      ID
      project {
        ID
      }
      bankAccount {
        beneficiaryName
        bankNameAddress
        IBAN
      }
      privateBond
      finance
      swift
      manager {
        ID
        name
        email
      }
    }
  }
`;

export const REVIEW_FORFAITING_APPLICATION = gql`
  mutation reviewForfaitingApplication($ID: ID!, $review: UpdateFAReview!) {
    reviewForfaitingApplication(ID: $ID, review: $review) {
      message
    }
  }
`;

export const ADVANCE_PROJECT_TO_WORK_PHASE = gql`
  mutation advanceProjectToWorkPhase($ID: ID!) {
    advanceProjectToWorkPhase(pid: $ID) {
      ID
      project
    }
  }
`;

export const REVIEW_WORK_PHASE = gql`
  mutation reviewWorkPhase($ID: ID!, $review: UpdateWPReview!) {
    reviewWorkPhase(ID: $ID, review: $review) {
      message
    }
  }
`;

export const COMMENT_PROJECT = gql`
  mutation commentProject($id: ID!, $comment: String!, $topic: String) {
    commentProject(id: $id, comment: $comment, topic: $topic) {
      ID
    }
  }
`;

export const ADVANCE_PROJECT_TO_MONITORING_PHASE = gql`
  mutation advanceProjectToMonitoringPhase($ID: ID!) {
    advanceProjectToMonitoringPhase(pid: $ID) {
      ID
      project
    }
  }
`;

export const REVIEW_MONITORING_PHASE = gql`
  mutation reviewMonitoringPhase($ID: ID!, $review: UpdateMPReview!) {
    reviewMonitoringPhase(ID: $ID, review: $review) {
      message
    }
  }
`;

export const UPDATE_TABLE = gql`
  mutation updateTable($projectID: ID!, $tableName: String!, $table: UpdateTable) {
    updateTable(projectID: $projectID, tableName: $tableName, table: $table) {
      columns {
        name
        kind
        headers
      }
      rows
    }
  }
`;

export const PROCESS_PROJECT_CREATION = gql`
  mutation processProjectCreation($userID: ID!, $assetID: ID!, $approve: Boolean!) {
    processProjectCreation(userID: $userID, assetID: $assetID, approve: $approve) {
      message
    }
  }
`;

export const CREATE_FORFAITING_PAYMENT = gql`
  mutation createForfaitingPayment($pid: ID!, $transferValue: Int!, $transferDate: Time, $currency: Currency!) {
    createForfaitingPayment(pid: $pid, transferValue: $transferValue, transferDate: $transferDate, currency: $currency) {
      ID
      transferValue
      transferDate
      currency
    }
  }
`;

export const UPDATE_FORFAITING_PAYMENT = gql`
  mutation updateForfaitingPayment($pid: ID!, $faid: ID!, $transferValue: Int!, $transferDate: Time, $currency: Currency!) {
    updateForfaitingPayment(pid: $pid, faid: $faid, transferValue: $transferValue, transferDate: $transferDate, currency: $currency) {
      ID
      transferValue
      transferDate
      currency
    }
  }
`;

export const UPDATE_FORFAITING_APPLICATION = gql`
  mutation updateForfaitingApplication($id: ID!, $fa: UpdateForfaitingApplication!) {
    updateForfaitingApplication(id: $id, fa: $fa) {
      ID
      manager {
        ID
        name
        email
      }
    }
  }
`;