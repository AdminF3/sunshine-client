import gql from 'graphql-tag';

export const LIST_ASSETS = gql`
  query listAssets($filterMine: Boolean, $first: Int, $offset: Int) {
    listAssets(filterMine: $filterMine, first: $first, offset: $offset) {
      totalCount
      entities {
        ID,
        ...on Asset {
          address,
          cadastre,
          ownerID,
          ownerName,
          coords,
          area,
          heatedArea,
          billingArea,
          flats,
          floors,
          stairCases,
          buildingType,
          heatingType,
          status,
          country,
          category,
          createdAt,

          residentsCount,
          projects {
            ...on Project {
              ID,
              name,
              ownerID,
              assetID,
              status,
              airTemperature,
              waterTemperature,
              guaranteedSavings,
              constructionFrom,
              constructionTo,
              contractTerm,
              firstYear,
              country,
              portfolioDirectorID,
              fundManagerID,
              milestone,
              createdAt,
              isFAApproved,
              workPhase {
                ID
              },
              monitoringPhase {
                ID
              }
            }
          }
        }
      }
    }
  }
`;
