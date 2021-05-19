import gql from 'graphql-tag';

export const GET_FORFAITING_APPLICATION = gql`
  query getForfaitingApplication($id: ID!) {
    getForfaitingApplication(id: $id) {
      ID
      project {
        ID
      }
      reviews {
        ID
        author {
          ID
          name
          email
        }
        approved
        comment
        type

      }
      bankAccount {
        bankNameAddress
        beneficiaryName
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
      financialStatements {
        ID
        name
        content_type
      }
      bankConfirmation {
        ID
        name
        content_type
      }
    }
  }
`;

export const GET_WORK_PHASE = gql`
  query getWorkPhase($id: ID!) {
    getWorkPhase(wpid: $id) {
      ID
      project
      reviews {
        ID
        author {
          ID
          name
          email
        }
        approved
        comment
        type
        created_at
      }
    }
  }
`;

export const GET_MONITORING_PHASE = gql`
  query getMonitoringPhase($id: ID!) {
    getMonitoringPhase(mpid: $id) {
      ID
      project
      createdAt
      updatedAt
      reviews {
        ID
        author {
          ID
          name
          email
        }
        approved
        comment
        type
      }
    }
  }
`;

export const GET_TABLE = gql`
  query getTable($projectID: ID!, $tableName: String!) {
    getTable(projectID: $projectID, tableName: $tableName) {
      columns {
        name
        kind
        headers
      }
      rows
    }
  }
`;

export const GET_INDOORCLIMA = gql`
  query getIndoorClima($id: ID!) {
    getIndoorClima(projectID: $id) {
      projectID
      attic {
        zone1 {
          area
          uvalue
          outdoorTemp {
            n
            n1
            n2
          }
          tempDiff {
            n
            n1
            n2
          }
          heatLossCoeff
        }
        zone2 {
          area
          uvalue
          outdoorTemp {
            n
            n1
            n2
          }
          tempDiff {
            n
            n1
            n2
          }
          heatLossCoeff
        }
      }
      basementCeiling {
        zone1 {
          area
          uvalue
          outdoorTemp {
            n
            n1
            n2
          }
          tempDiff {
            n
            n1
            n2
          }
          heatLossCoeff
        }
        zone2 {
          area
          uvalue
          outdoorTemp {
            n
            n1
            n2
          }
          tempDiff {
            n
            n1
            n2
          }
          heatLossCoeff
        }
      }
      externalDoor {
        num1 {
          zone1 {
            area
            uvalue
            outdoorTemp {
              n
              n1
              n2
            }
            tempDiff {
              n
              n1
              n2
            }
            heatLossCoeff
          }
          zone2 {
            area
            uvalue
            outdoorTemp {
              n
              n1
              n2
            }
            tempDiff {
              n
              n1
              n2
            }
            heatLossCoeff
          }
        }
        num2 {
          zone1 {
            area
            uvalue
            outdoorTemp {
              n
              n1
              n2
            }
            tempDiff {
              n
              n1
              n2
            }
            heatLossCoeff
          }
          zone2 {
            area
            uvalue
            outdoorTemp {
              n
              n1
              n2
            }
            tempDiff {
              n
              n1
              n2
            }
            heatLossCoeff
          }
        }
      }
      externalWall {
        num1 {
          zone1 {
            area
            uvalue
            outdoorTemp {
              n
              n1
              n2
            }
            tempDiff {
              n
              n1
              n2
            }
            heatLossCoeff
          }
          zone2 {
            area
            uvalue
            outdoorTemp {
              n
              n1
              n2
            }
            tempDiff {
              n
              n1
              n2
            }
            heatLossCoeff
          }
        }
        num2 {
          zone1 {
            area
            uvalue
            outdoorTemp {
              n
              n1
              n2
            }
            tempDiff {
              n
              n1
              n2
            }
            heatLossCoeff
          }
          zone2 {
            area
            uvalue
            outdoorTemp {
              n
              n1
              n2
            }
            tempDiff {
              n
              n1
              n2
            }
            heatLossCoeff
          }
        }
        num3 {
          zone1 {
            area
            uvalue
            outdoorTemp {
              n
              n1
              n2
            }
            tempDiff {
              n
              n1
              n2
            }
            heatLossCoeff
          }
          zone2 {
            area
            uvalue
            outdoorTemp {
              n
              n1
              n2
            }
            tempDiff {
              n
              n1
              n2
            }
            heatLossCoeff
          }
        }
        num4 {
          zone1 {
            area
            uvalue
            outdoorTemp {
              n
              n1
              n2
            }
            tempDiff {
              n
              n1
              n2
            }
            heatLossCoeff
          }
          zone2 {
            area
            uvalue
            outdoorTemp {
              n
              n1
              n2
            }
            tempDiff {
              n
              n1
              n2
            }
            heatLossCoeff
          }
        }
      }
      window {
        num1 {
          zone1 {
            area
            uvalue
            outdoorTemp {
              n
              n1
              n2
            }
            tempDiff {
              n
              n1
              n2
            }
            heatLossCoeff
          }
          zone2 {
            area
            uvalue
            outdoorTemp {
              n
              n1
              n2
            }
            tempDiff {
              n
              n1
              n2
            }
            heatLossCoeff
          }
        }
        num2 {
          zone1 {
            area
            uvalue
            outdoorTemp {
              n
              n1
              n2
            }
            tempDiff {
              n
              n1
              n2
            }
            heatLossCoeff
          }
          zone2 {
            area
            uvalue
            outdoorTemp {
              n
              n1
              n2
            }
            tempDiff {
              n
              n1
              n2
            }
            heatLossCoeff
          }
        }
      }
      ground {
        zone1 {
          area
          uvalue
          outdoorTemp {
            n
            n1
            n2
          }
          tempDiff {
            n
            n1
            n2
          }
          heatLossCoeff
        }
        zone2 {
          area
          uvalue
          outdoorTemp {
            n
            n1
            n2
          }
          tempDiff {
            n
            n1
            n2
          }
          heatLossCoeff
        }
      }
      roof {
        zone1 {
          area
          uvalue
          outdoorTemp {
            n
            n1
            n2
          }
          tempDiff {
            n
            n1
            n2
          }
          heatLossCoeff
        }
        zone2 {
          area
          uvalue
          outdoorTemp {
            n
            n1
            n2
          }
          tempDiff {
            n
            n1
            n2
          }
          heatLossCoeff
        }
      }
      baseWall {
        zone1 {
          area
          uvalue
          outdoorTemp {
            n
            n1
            n2
          }
          tempDiff {
            n
            n1
            n2
          }
          heatLossCoeff
        }
        zone2 {
          area
          uvalue
          outdoorTemp {
            n
            n1
            n2
          }
          tempDiff {
            n
            n1
            n2
          }
          heatLossCoeff
        }
      }
      totalHTZone1
      totalHTZone2
      totalHT
      heatGainsInternal
      heatGainsSolar
      heatedVolumeBuilding
      distributionLossesBasement
      distributionLossesAttic
      basementPipes {
        pipe {
          quality
          installedLength
          diameter
          heatLossUnit
          heatLossYear
        }
      }
      atticPipes {
        pipe {
          quality
          installedLength
          diameter
          heatLossUnit
          heatLossYear
        }
      }
      airexWindows {
        n
        n1
        n2
      }
      airexBuilding {
        n
        n1
        n2
      }
      airexTotal {
        n
        n1
        n2
      }
      totalEnergyConsumption {
        n
        n1
        n2
      }
      totalEConsumptionCircLosses {
        n
        n1
        n2
      }
      circulationLosses {
        n
        n1
        n2
      }
      totalMeasured {
        n
        n1
        n2
      }
      totalCalculated {
        n
        n1
        n2
      }
      indoorTemp {
        n
        n1
        n2
      }
    }
  }
`;
