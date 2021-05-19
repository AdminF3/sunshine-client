import {
  PROJECT_REGISTER_REQUEST, PROJECT_REGISTER_SUCCESS, PROJECT_REGISTER_FAILURE,
  ALL_PROJECT_REQUEST, ALL_PROJECT_SUCCESS, ALL_PROJECT_FAILURE,
  MY_PROJECTS_REQUEST, MY_PROJECTS_SUCCESS, MY_PROJECTS_FAILURE,
  SEARCH_PROJECTS_REQUEST, SEARCH_PROJECTS_SUCCESS, SEARCH_PROJECTS_FAILURE,
  GET_SINGLE_PROJECT_REQUEST, GET_SINGLE_PROJECT_SUCCESS, GET_SINGLE_PROJECT_FAILURE,
  GET_ENERGY_TABLE_REQUEST, GET_ENERGY_TABLE_SUCCESS, GET_ENERGY_TABLE_FAILURE,
  GET_MAINTENANCE_TABLE_REQUEST, GET_MAINTENANCE_TABLE_SUCCESS, GET_MAINTENANCE_TABLE_FAILURE,
  GET_FEES_TABLE_REQUEST, GET_FEES_TABLE_SUCCESS, GET_FEES_TABLE_FAILURE,
  GET_ANNEXES_FIELDS_REQUEST, GET_ANNEXES_FIELDS_SUCCESS, GET_ANNEXES_FIELDS_FAILURE,
  GET_BUDGET_TABLE_REQUEST, GET_BUDGET_TABLE_SUCCESS, GET_BUDGET_TABLE_FAILURE,
  UPDATE_ENERGY_TABLE_REQUEST, UPDATE_ENERGY_TABLE_SUCCESS, UPDATE_ENERGY_TABLE_FAILURE,
  UPDATE_MAINTENANCE_TABLE_REQUEST, UPDATE_MAINTENANCE_TABLE_SUCCESS, UPDATE_MAINTENANCE_TABLE_FAILURE,
  UPDATE_FEES_TABLE_REQUEST, UPDATE_FEES_TABLE_SUCCESS, UPDATE_FEES_TABLE_FAILURE,
  UPDATE_ANNEXES_FIELDS_REQUEST, UPDATE_ANNEXES_FIELDS_SUCCESS, UPDATE_ANNEXES_FIELDS_FAILURE,
  UPDATE_BUDGET_TABLE_REQUEST, UPDATE_BUDGET_TABLE_SUCCESS, UPDATE_BUDGET_TABLE_FAILURE,
  FOREFAITING_AGREEMENT_UPDATE_REQUEST, FOREFAITING_AGREEMENT_UPDATE_SUCCESS,
  FOREFAITING_AGREEMENT_UPDATE_FAILURE, GET_FORFAITING_AGREEMENT_REQUEST,
  GET_FORFAITING_AGREEMENT_SUCCESS, GET_FORFAITING_AGREEMENT_FAILURE,
  UPDATE_INDOOR_CLIMA_REQUEST, UPDATE_INDOOR_CLIMA_SUCCESS, UPDATE_INDOOR_CLIMA_FAILURE,
  PROJECT_UPDATE_REQUEST, PROJECT_UPDATE_SUCCESS, PROJECT_UPDATE_FAILURE, SET_LOGGED_USER_ROLE,
  UNSET_LOGGED_USER_ROLE, ADD_ADDITIONAL_ROW, SET_PROJECT_TYPE_FILTER, SET_ALL_PROJECTS_NUMBER,
  SET_MY_PROJECTS_NUMBER, SEARCH_MY_PROJECTS_SUCCESS, SEARCH_MY_PROJECTS_REQUEST, SEARCH_MY_PROJECTS_FAILURE,
  GET_MARKDOWN_REQUEST, GET_MARKDOWN_SUCCESS, GET_MARKDOWN_FAILURE,
  UPDATE_MARKDOWN_REQUEST, UPDATE_MARKDOWN_SUCCESS, UPDATE_MARKDOWN_FAILURE, ANNEX_READY,
  REFETCH_SINGLE_PROJECT_REQUEST, REFETCH_SINGLE_PROJECT_SUCCESS, REFETCH_SINGLE_PROJECT_FAILURE,
  THEIR_PROJECTS_REQUEST, THEIR_PROJECTS_SUCCESS, THEIR_PROJECTS_FAILURE
} from './../constants/actionTypes';

/* TODO (edimov): Reducer needs refactoring. Remove linter supression after. */
/* eslint-disable complexity */
export default function projectReducer(state = {
  isFetchingSingle: true,
  isFetchingList: true,
  isFetchingProj: true,
  singleProjectReady: false,
  typeFilter: null,
  registered: '',
  allProjects: [],
  allProjectsNumber: null,
  allProjectsReady: false,
  myProjects: [],
  myProjectsNumber: null,
  theirProjects: [],
  singleProject: {},
  refetchProject: {},
  updateData: {},
  fieldsUpdateData: {},
  projectRoles: [],
  loggedUserRole: 'unsigned',
  isFetchingMarkdown: false,
  markdown: null,
  search: {
    id: null,
    name: null
  },
  annexes: {
    annex1: {
      annex1Ready: false,
      table1: [],
      table2: [],
      table3: [],
      table4: [],
      table5: [],
      table6: [],
    },
    annex2: {
      annex2Ready: false,
    },
    annex3: {
      annex3Ready: false,
      table1: [],
      table2: [],
      table3: [],
      table4: []
    },
    annex4: {
      annex4Ready: false,
      table1: [],
      table2: [],
      table3: [],
      table4: [],
      table5: [],
      table6: [],
      table7: [],
      table8: []
    },
    annex5: {
      annex5Ready: false,
      table1: [],
      table2: [],
      table3: [],
      table4: []
    },
    annex67: {
      annex67Ready: false,
      annex67Fields: {}
    }
  },
  forfaitingAgreement: {
    forfaitingReady: false,
    forfaitingFields: {}
  },
  indoorClima: {
    indoorClimaReady: false,
    indoorClimaFields: {},
  },
}, action) {
  switch (action.type) {
    case PROJECT_REGISTER_REQUEST:
      return Object.assign({}, state, {
        // isFetchingSingle: true
      });
    case PROJECT_REGISTER_SUCCESS:
      return Object.assign({}, state, {
        // isFetchingSingle: false,
        registered: action.project._id
      });
    case PROJECT_REGISTER_FAILURE:
      return Object.assign({}, state, {
        // isFetchingSingle: false
      });
    case SEARCH_PROJECTS_REQUEST:
      return Object.assign({}, state, {
        isFetchingList: false,
        allProjectsReady: false,
      });
    case SEARCH_PROJECTS_SUCCESS:
      return Object.assign({}, state, {
        allProjectsReady: true,
        isFetchingList: false,
        allProjects: action.payload
      });
    case SEARCH_PROJECTS_FAILURE:
      return Object.assign({}, state, {
        allProjectsReady: true,
        allProjects: [],
        isFetchingList: false,
      });
    case SEARCH_MY_PROJECTS_REQUEST:
      return Object.assign({}, state, {
        isFetchingList: true
      });
    case SEARCH_MY_PROJECTS_SUCCESS:
      return Object.assign({}, state, {
        isFetchingList: false,
        myProjects: action.payload
      });
    case SEARCH_MY_PROJECTS_FAILURE:
      return Object.assign({}, state, {
        isFetchingList: false
      });
    case SET_PROJECT_TYPE_FILTER:
      return Object.assign({}, state, {
        typeFilter: action.payload
      });
    case ALL_PROJECT_REQUEST:
      return Object.assign({}, state, {
        isFetchingList: true,
        allProjectsReady: false,
      });
    case ALL_PROJECT_SUCCESS:
      return Object.assign({}, state, {
        isFetchingList: false,
        allProjectsReady: true,
        allProjects: action.all,
      });
    case ALL_PROJECT_FAILURE:
      return Object.assign({}, state, {
        allProjectsReady: true,
        isFetchingList: false,
        allProjects: [],
      });
    case SET_ALL_PROJECTS_NUMBER:
      return Object.assign({}, state, {
        allProjectsNumber: parseInt(action.payload, 10),
      });
    case SET_MY_PROJECTS_NUMBER:
      return Object.assign({}, state, {
        myProjectsNumber: parseInt(action.payload, 10),
      });
    case MY_PROJECTS_REQUEST:
      return Object.assign({}, state, {
        isFetchingList: true
      });
    case MY_PROJECTS_SUCCESS:
      return Object.assign({}, state, {
        isFetchingList: false,
        myProjects: action.payload
      });
    case MY_PROJECTS_FAILURE:
      return Object.assign({}, state, {
        isFetchingList: false
      });
    case THEIR_PROJECTS_REQUEST:
      return Object.assign({}, state, {
        isFetchingList: true
      });
    case THEIR_PROJECTS_SUCCESS:
      return Object.assign({}, state, {
        isFetchingList: false,
        theirProjects: action.payload
      });
    case THEIR_PROJECTS_FAILURE:
      return Object.assign({}, state, {
        isFetchingList: false
      });
    case GET_SINGLE_PROJECT_REQUEST:
      return Object.assign({}, state, {
        singleProject: {},
        refetchProject: {},
        isFetchingProj: true,
        singleProjectReady: false
      });
    case GET_SINGLE_PROJECT_SUCCESS:
      return Object.assign({}, state, {
        isFetchingProj: false,
        singleProjectReady: true,
        singleProject: action.singleProject,
        refetchProject: action.singleProject,
        updateData: action.singleProject.data,
        registered: ''
      });
    case GET_SINGLE_PROJECT_FAILURE:
      return Object.assign({}, state, {
        singleProject: {},
        refetchProject: {},
        isFetchingProj: false,
        singleProjectReady: false
      });
    case 'SET_PROJECT_UPDATE_DATA':
      return { ...state, updateData: { ...state.updateData, ...action.data } };
    case REFETCH_SINGLE_PROJECT_REQUEST:
      return Object.assign({}, state, {
      });
    case REFETCH_SINGLE_PROJECT_SUCCESS:
      return Object.assign({}, state, {
        refetchProject: action.refetchProject,
      });
    case REFETCH_SINGLE_PROJECT_FAILURE:
      return Object.assign({}, state, {
        refetchProject: {},
      });
    case GET_BUDGET_TABLE_REQUEST:
      return Object.assign({}, state, {
        annexes: Object.assign({}, state.annexes, {
          annex1: Object.assign({}, state.annexes.annex1, {
            annex1Ready: false
          })
        })
      });
    case GET_BUDGET_TABLE_SUCCESS:
      return Object.assign({}, state, {
        annexes: Object.assign({}, state.annexes, {
          annex1: Object.assign({}, state.annexes.annex1, {
            ['table' + action.table]: action.data
          })
        })
      });
    case GET_BUDGET_TABLE_FAILURE:
      return Object.assign({}, state, {
        annexes: Object.assign({}, state.annexes, {
          annex1: Object.assign({}, state.annexes.annex1, {
            annex1Ready: false
          })
        })
      });
    case GET_ENERGY_TABLE_REQUEST:
      return Object.assign({}, state, {
        annexes: Object.assign({}, state.annexes, {
          annex3: Object.assign({}, state.annexes.annex3, {
            annex3Ready: false
          })
        })
      });
    case GET_ENERGY_TABLE_SUCCESS:
      return Object.assign({}, state, {
        annexes: Object.assign({}, state.annexes, {
          annex3: Object.assign({}, state.annexes.annex3, {
            ['table' + action.table]: action.data
          })
        })
      });
    case GET_ENERGY_TABLE_FAILURE:
      return Object.assign({}, state, {
        annexes: Object.assign({}, state.annexes, {
          annex3: Object.assign({}, state.annexes.annex3, {
            annex3Ready: false
          })
        })
      });
    case GET_MAINTENANCE_TABLE_REQUEST:
      return Object.assign({}, state, {
        annexes: Object.assign({}, state.annexes, {
          annex4: Object.assign({}, state.annexes.annex4, {
            annex4Ready: false
          })
        })
      });
    case GET_MAINTENANCE_TABLE_SUCCESS:
      return Object.assign({}, state, {
        annexes: Object.assign({}, state.annexes, {
          annex4: Object.assign({}, state.annexes.annex4, {
            ['table' + action.table]: action.data
          })
        })
      });
    case GET_MAINTENANCE_TABLE_FAILURE:
      return Object.assign({}, state, {
        annexes: Object.assign({}, state.annexes, {
          annex4: Object.assign({}, state.annexes.annex4, {
            annex4Ready: false
          })
        })
      });
    case GET_FEES_TABLE_REQUEST:
      return Object.assign({}, state, {
        annexes: Object.assign({}, state.annexes, {
          annex5: Object.assign({}, state.annexes.annex5, {
            annex5Ready: false
          })
        })
      });
    case GET_FEES_TABLE_SUCCESS:
      return Object.assign({}, state, {
        annexes: Object.assign({}, state.annexes, {
          annex5: Object.assign({}, state.annexes.annex5, {
            ['table' + action.table]: action.data
          })
        })
      });
    case GET_FEES_TABLE_FAILURE:
      return Object.assign({}, state, {
        annexes: Object.assign({}, state.annexes, {
          annex5: Object.assign({}, state.annexes.annex5, {
            annex5Ready: false
          })
        })
      });
    case GET_ANNEXES_FIELDS_REQUEST:
      return Object.assign({}, state, {
        isFetchingSingle: true
      });
    case GET_ANNEXES_FIELDS_SUCCESS:
    case UPDATE_ANNEXES_FIELDS_SUCCESS:
      return {
        ...state,
        annexes: {
          ...state.annexes,
          annex67: {
            ...state.annexes.annex67,
            annex67Ready: true,
            annex67Fields: action.data,
          },
        },
        fieldsUpdateData: { ...action.data },
      };
    case GET_ANNEXES_FIELDS_FAILURE:
      return Object.assign({}, state, {
        isFetchingSingle: false,
        annexes: Object.assign({}, state.annexes, {
          annex67: Object.assign({}, state.annexes.annex67, {
            annex67Ready: true
          })
        })
      });
    case UPDATE_ANNEXES_FIELDS_REQUEST:
      return Object.assign({}, state, {
        isFetchingSingle: true
      });
    case UPDATE_ANNEXES_FIELDS_FAILURE:
      return Object.assign({}, state, {
        isFetchingSingle: false
      });
    case 'SET_PROJECT_FIEDS_UPDATE_DATA':
      return { ...state, fieldsUpdateData: { ...state.fieldsUpdateData, ...action.data } };
    case UPDATE_INDOOR_CLIMA_REQUEST:
      return Object.assign({}, state, {
        isFetchingSingle: true,
        indoorClima: Object.assign({}, state.indoorClima, {
          indoorClima: false
        })
      });
    case UPDATE_INDOOR_CLIMA_SUCCESS:
      return Object.assign({}, state, {
        isFetchingSingle: false,
        indoorClima: Object.assign({}, state.indoorClima, {
          indoorClimaReady: true,
          indoorClimaFields: action.data
        })
      });
    case UPDATE_INDOOR_CLIMA_FAILURE:
      return Object.assign({}, state, {
        isFetchingSingle: false,
        indoorClima: Object.assign({}, state.indoorClima, {
          indoorClimaReady: true
        })
      });
    case UPDATE_ENERGY_TABLE_REQUEST:
      return Object.assign({}, state, {
        isFetchingSingle: true
      });
    case UPDATE_ENERGY_TABLE_SUCCESS:
      switch (action.table[0]) {
        case 'baseyear_n_2':
          return Object.assign({}, state, {
            isFetchingSingle: false,
            annexes: Object.assign({}, state.annexes, {
              annex3: Object.assign({}, state.annexes.annex3, {
                table1: action.data
              })
            })
          });
        case 'baseyear_n_1':
          return Object.assign({}, state, {
            isFetchingSingle: false,
            annexes: Object.assign({}, state.annexes, {
              annex3: Object.assign({}, state.annexes.annex3, {
                table2: action.data
              })
            })
          });
        case 'baseyear_n':
          return Object.assign({}, state, {
            isFetchingSingle: false,
            annexes: Object.assign({}, state.annexes, {
              annex3: Object.assign({}, state.annexes.annex3, {
                table3: action.data
              })
            })
          });
        default:
          return state;
      }
    case UPDATE_ENERGY_TABLE_FAILURE:
      return Object.assign({}, state, {
        isFetchingSingle: false
      });
    case UPDATE_BUDGET_TABLE_REQUEST:
      return Object.assign({}, state, {
        isFetchingSingle: true
      });
    case UPDATE_BUDGET_TABLE_SUCCESS:
      switch (action.table[0]) {
        case 'scope_project_dev_and_mgmt':
          return Object.assign({}, state, {
            isFetchingSingle: false,
            annexes: Object.assign({}, state.annexes, {
              annex1: Object.assign({}, state.annexes.annex1, {
                table1: action.data
              })
            })
          });
        case 'scope_construction_costs':
          return Object.assign({}, state, {
            isFetchingSingle: false,
            annexes: Object.assign({}, state.annexes, {
              annex1: Object.assign({}, state.annexes.annex1, {
                table2: action.data
              })
            })
          });
        case 'scope_project_supervision':
          return Object.assign({}, state, {
            isFetchingSingle: false,
            annexes: Object.assign({}, state.annexes, {
              annex1: Object.assign({}, state.annexes.annex1, {
                table3: action.data
              })
            })
          });
        case 'scope_financial_charges':
          return Object.assign({}, state, {
            isFetchingSingle: false,
            annexes: Object.assign({}, state.annexes, {
              annex1: Object.assign({}, state.annexes.annex1, {
                table4: action.data
              })
            })
          });
        case 'renovation_overall_budget':
          return Object.assign({}, state, {
            isFetchingSingle: false,
            annexes: Object.assign({}, state.annexes, {
              annex1: Object.assign({}, state.annexes.annex1, {
                table5: action.data
              })
            })
          });
        case 'breakdown_project_dev_and_mgmt':
          return Object.assign({}, state, {
            isFetchingSingle: false,
            annexes: Object.assign({}, state.annexes, {
              annex1: Object.assign({}, state.annexes.annex1, {
                table9: action.data
              })
            })
          });
        case 'breakdown_construction_costs':
          return Object.assign({}, state, {
            isFetchingSingle: false,
            annexes: Object.assign({}, state.annexes, {
              annex1: Object.assign({}, state.annexes.annex1, {
                table10: action.data
              })
            })
          });
        case 'breakdown_project_supervision':
          return Object.assign({}, state, {
            isFetchingSingle: false,
            annexes: Object.assign({}, state.annexes, {
              annex1: Object.assign({}, state.annexes.annex1, {
                table11: action.data
              })
            })
          });
        case 'breakdown_financial_charges':
          return Object.assign({}, state, {
            isFetchingSingle: false,
            annexes: Object.assign({}, state.annexes, {
              annex1: Object.assign({}, state.annexes.annex1, {
                table12: action.data
              })
            })
          });
        default:
          return state;
      }
    case UPDATE_BUDGET_TABLE_FAILURE:
      return Object.assign({}, state, {
        isFetchingSingle: false
      });
    case UPDATE_MAINTENANCE_TABLE_REQUEST:
      return Object.assign({}, state, {
        isFetchingSingle: true
      });
    case UPDATE_MAINTENANCE_TABLE_SUCCESS:
      switch (action.table[0]) {
        case 'periodic_maint_activities_covered_by_contractor':
          return Object.assign({}, state, {
            isFetchingSingle: false,
            annexes: Object.assign({}, state.annexes, {
              annex4: Object.assign({}, state.annexes.annex4, {
                table1: action.data
              })
            })
          });
        case 'mid_term_preventative_activity':
          return Object.assign({}, state, {
            isFetchingSingle: false,
            annexes: Object.assign({}, state.annexes, {
              annex4: Object.assign({}, state.annexes.annex4, {
                table2: action.data
              })
            })
          });
        case 'long_term_provisioned_activities':
          return Object.assign({}, state, {
            isFetchingSingle: false,
            annexes: Object.assign({}, state.annexes, {
              annex4: Object.assign({}, state.annexes.annex4, {
                table3: action.data
              })
            })
          });
        case 'operation_maintenance_budget':
          return Object.assign({}, state, {
            isFetchingSingle: false,
            annexes: Object.assign({}, state.annexes, {
              annex4: Object.assign({}, state.annexes.annex4, {
                table4: action.data
              })
            })
          });
        case 'reccomended_maintanance_activity':
          return Object.assign({}, state, {
            isFetchingSingle: false,
            annexes: Object.assign({}, state.annexes, {
              annex4: Object.assign({}, state.annexes.annex4, {
                table5: action.data
              })
            })
          });
        case 'maintenance6-table-redux-field-0-0':
          return Object.assign({}, state, {
            isFetchingSingle: false,
            annexes: Object.assign({}, state.annexes, {
              annex4: Object.assign({}, state.annexes.annex4, {
                table6: action.data
              })
            })
          });
        case 'maintenance7-table-redux-field-0-0':
          return Object.assign({}, state, {
            isFetchingSingle: false,
            annexes: Object.assign({}, state.annexes, {
              annex4: Object.assign({}, state.annexes.annex4, {
                table7: action.data
              })
            })
          });
        case 'maintenance8-table-redux-field-0-0':
          return Object.assign({}, state, {
            isFetchingSingle: false,
            annexes: Object.assign({}, state.annexes, {
              annex4: Object.assign({}, state.annexes.annex4, {
                table8: action.data
              })
            })
          });
        default:
          return state;
      }
    case UPDATE_MAINTENANCE_TABLE_FAILURE:
      return Object.assign({}, state, {
        isFetchingSingle: false
      });
    case UPDATE_FEES_TABLE_REQUEST:
      return Object.assign({}, state, {
        isFetchingSingle: true
      });
    case UPDATE_FEES_TABLE_SUCCESS:
      switch (action.table[0]) {
        case 'calc_energy_fee':
          return Object.assign({}, state, {
            isFetchingSingle: false,
            annexes: Object.assign({}, state.annexes, {
              annex5: Object.assign({}, state.annexes.annex5, {
                table1: action.data
              })
            })
          });
        case 'balancing_period_fee':
          return Object.assign({}, state, {
            isFetchingSingle: false,
            annexes: Object.assign({}, state.annexes, {
              annex5: Object.assign({}, state.annexes.annex5, {
                table2: action.data
              })
            })
          });
        case 'total_renovation_fee':
          return Object.assign({}, state, {
            isFetchingSingle: false,
            annexes: Object.assign({}, state.annexes, {
              annex5: Object.assign({}, state.annexes.annex5, {
                table3: action.data
              })
            })
          });
        case 'operations_maintenance_fee':
          return Object.assign({}, state, {
            isFetchingSingle: false,
            annexes: Object.assign({}, state.annexes, {
              annex5: Object.assign({}, state.annexes.annex5, {
                table4: action.data
              })
            })
          });
        default:
          return state;
      }
    case UPDATE_FEES_TABLE_FAILURE:
      return Object.assign({}, state, {
        isFetchingSingle: false
      });
    case FOREFAITING_AGREEMENT_UPDATE_REQUEST:
      return Object.assign({}, state, {
        isFetchingSingle: true,
        forfaitingAgreement: Object.assign({}, state.forfaitingAgreement, {
          forfaitingReady: false
        })
      });
    case FOREFAITING_AGREEMENT_UPDATE_SUCCESS:
      return Object.assign({}, state, {
        isFetchingSingle: false,
        forfaitingAgreement: Object.assign({}, state.forfaitingAgreement, {
          forfaitingReady: true,
          forfaitingFields: action.data
        })
      });
    case FOREFAITING_AGREEMENT_UPDATE_FAILURE:
      return Object.assign({}, state, {
        forfaitingAgreement: Object.assign({}, state.forfaitingAgreement, {
          forfaitingReady: true
        })
      });
    case GET_FORFAITING_AGREEMENT_REQUEST:
      return Object.assign({}, state, {
        isFetchingSingle: true,
        forfaitingAgreement: Object.assign({}, state.forfaitingAgreement, {
          forfaitingReady: false
        })
      });
    case GET_FORFAITING_AGREEMENT_SUCCESS:
      return Object.assign({}, state, {
        isFetchingSingle: false,
        forfaitingAgreement: Object.assign({}, state.forfaitingAgreement, {
          forfaitingReady: true,
          forfaitingFields: action.data
        })
      });
    case GET_FORFAITING_AGREEMENT_FAILURE:
      return Object.assign({}, state, {
        isFetchingSingle: false,
        forfaitingAgreement: Object.assign({}, state.forfaitingAgreement, {
          forfaitingReady: true
        })
      });
    case PROJECT_UPDATE_REQUEST:
      return Object.assign({}, state, {
        isFetchingSingle: true
      });
    case PROJECT_UPDATE_SUCCESS:
      return Object.assign({}, state, {
        isFetchingSingle: false,
        singleProject: action.project,
        refetchProject: action.project
      });
    case PROJECT_UPDATE_FAILURE:
      return Object.assign({}, state, {
        isFetchingSingle: false
      });
    case SET_LOGGED_USER_ROLE:
      return Object.assign({}, state, {
        loggedUserRole: action.payload
      });
    case UNSET_LOGGED_USER_ROLE:
      return Object.assign({}, state, {
        loggedUserRole: 'unsigned'
      });
    case ADD_ADDITIONAL_ROW:
      switch (action.table[0]) {
        case 'scope_project_dev_and_mgmt':
          return Object.assign({}, state, {
            annexes: Object.assign({}, state.annexes, {
              annex1: Object.assign({}, state.annexes.annex1, {
                table1: Object.assign({}, state.annexes.annex1.table1, {
                  rows: action.data
                })
              })
            })
          });
        case 'scope_construction_costs':

          return Object.assign({}, state, {
            annexes: Object.assign({}, state.annexes, {
              annex1: Object.assign({}, state.annexes.annex1, {
                table2: Object.assign({}, state.annexes.annex1.table2, {
                  rows: action.data
                })
              })
            })
          });
        case 'scope_project_supervision':
          return Object.assign({}, state, {
            annexes: Object.assign({}, state.annexes, {
              annex1: Object.assign({}, state.annexes.annex1, {
                table3: Object.assign({}, state.annexes.annex1.table3, {
                  rows: action.data
                })
              })
            })
          });
        case 'scope_financial_charges':
          return Object.assign({}, state, {
            annexes: Object.assign({}, state.annexes, {
              annex1: Object.assign({}, state.annexes.annex1, {
                table4: Object.assign({}, state.annexes.annex1.table4, {
                  rows: action.data
                })
              })
            })
          });
        case 'renovation_overall_budget':
          return Object.assign({}, state, {
            annexes: Object.assign({}, state.annexes, {
              annex1: Object.assign({}, state.annexes.annex1, {
                table5: Object.assign({}, state.annexes.annex1.table5, {
                  rows: action.data
                })
              })
            })
          });
        case 'renovation_financial_plan':
          return Object.assign({}, state, {
            isFetchingSingle: false,
            annexes: Object.assign({}, state.annexes, {
              annex1: Object.assign({}, state.annexes.annex1, {
                table6: Object.assign({}, state.annexes.annex1.table6, {
                  rows: action.data
                }),
              })
            })
          });
        case 'breakdown_project_dev_and_mgmt':
          return Object.assign({}, state, {
            isFetchingSingle: false,
            annexes: Object.assign({}, state.annexes, {
              annex1: Object.assign({}, state.annexes.annex1, {
                table9: Object.assign({}, state.annexes.annex1.table9, {
                  rows: action.data
                })
              })
            })
          });
        case 'breakdown_construction_costs':
          return Object.assign({}, state, {
            isFetchingSingle: false,
            annexes: Object.assign({}, state.annexes, {
              annex1: Object.assign({}, state.annexes.annex1, {
                table10: Object.assign({}, state.annexes.annex1.table10, {
                  rows: action.data
                })
              })
            })
          });
        case 'breakdown_project_supervision':
          return Object.assign({}, state, {
            isFetchingSingle: false,
            annexes: Object.assign({}, state.annexes, {
              annex1: Object.assign({}, state.annexes.annex1, {
                table11: Object.assign({}, state.annexes.annex1.table11, {
                  rows: action.data
                })
              })
            })
          });
        case 'breakdown_financial_charges':
          return Object.assign({}, state, {
            isFetchingSingle: false,
            annexes: Object.assign({}, state.annexes, {
              annex1: Object.assign({}, state.annexes.annex1, {
                table12: Object.assign({}, state.annexes.annex1.table12, {
                  rows: action.data
                })
              })
            })
          });
        case 'periodic_maint_activities_covered_by_contractor':
          return Object.assign({}, state, {
            isFetchingSingle: false,
            annexes: Object.assign({}, state.annexes, {
              annex4: Object.assign({}, state.annexes.annex4, {
                table1: Object.assign({}, state.annexes.annex4.table1, {
                  rows: action.data
                })
              })
            })
          });
        case 'mid_term_preventative_activity':
          return Object.assign({}, state, {
            isFetchingSingle: false,
            annexes: Object.assign({}, state.annexes, {
              annex4: Object.assign({}, state.annexes.annex4, {
                table2: Object.assign({}, state.annexes.annex4.table2, {
                  rows: action.data
                })
              })
            })
          });
        case 'long_term_provisioned_activities':
          return Object.assign({}, state, {
            isFetchingSingle: false,
            annexes: Object.assign({}, state.annexes, {
              annex4: Object.assign({}, state.annexes.annex4, {
                table3: Object.assign({}, state.annexes.annex4.table3, {
                  rows: action.data
                })
              })
            })
          });
        case 'operation_maintenance_budget':
          return Object.assign({}, state, {
            isFetchingSingle: false,
            annexes: Object.assign({}, state.annexes, {
              annex4: Object.assign({}, state.annexes.annex4, {
                table4: Object.assign({}, state.annexes.annex4.table4, {
                  rows: action.data
                })
              })
            })
          });
        case 'reccomended_maintanance_activity':
          return Object.assign({}, state, {
            isFetchingSingle: false,
            annexes: Object.assign({}, state.annexes, {
              annex4: Object.assign({}, state.annexes.annex4, {
                table5: Object.assign({}, state.annexes.annex4.table5, {
                  rows: action.data
                })
              })
            })
          });
        case 'maintenance6-table-redux-field-0-0':
          return Object.assign({}, state, {
            isFetchingSingle: false,
            annexes: Object.assign({}, state.annexes, {
              annex4: Object.assign({}, state.annexes.annex4, {
                table6: Object.assign({}, state.annexes.annex4.table6, {
                  rows: action.data
                })
              })
            })
          });
        case 'maintenance7-table-redux-field-0-0':
          return Object.assign({}, state, {
            isFetchingSingle: false,
            annexes: Object.assign({}, state.annexes, {
              annex4: Object.assign({}, state.annexes.annex4, {
                table7: Object.assign({}, state.annexes.annex4.table7, {
                  rows: action.data
                })
              })
            })
          });
        case 'maintenance8-table-redux-field-0-0':
          return Object.assign({}, state, {
            isFetchingSingle: false,
            annexes: Object.assign({}, state.annexes, {
              annex4: Object.assign({}, state.annexes.annex4, {
                table8: Object.assign({}, state.annexes.annex4.table8, {
                  rows: action.data
                })
              })
            })
          });
        case 'calc_energy_fee':
          return Object.assign({}, state, {
            annexes: Object.assign({}, state.annexes, {
              annex5: Object.assign({}, state.annexes.annex5, {
                table1: Object.assign({}, state.annexes.annex5.table1, {
                  rows: action.data
                })
              })
            })
          });
        case 'balancing_period_fee':
          return Object.assign({}, state, {
            annexes: Object.assign({}, state.annexes, {
              annex5: Object.assign({}, state.annexes.annex5, {
                table2: Object.assign({}, state.annexes.annex5.table2, {
                  rows: action.data
                })
              })
            })
          });
        case 'total_renovation_fee':
          return Object.assign({}, state, {
            annexes: Object.assign({}, state.annexes, {
              annex5: Object.assign({}, state.annexes.annex5, {
                table3: Object.assign({}, state.annexes.annex5.table3, {
                  rows: action.data
                })
              })
            })
          });
        case 'operations_maintenance_fee':
          return Object.assign({}, state, {
            annexes: Object.assign({}, state.annexes, {
              annex5: Object.assign({}, state.annexes.annex5, {
                table4: Object.assign({}, state.annexes.annex5.table4, {
                  rows: action.data
                })
              })
            })
          });
        default:
          return state;
      }
    case GET_MARKDOWN_REQUEST:
      return Object.assign({}, state, {
        isFetchingMarkdown: true,
      });
    case GET_MARKDOWN_SUCCESS:
      return Object.assign({}, state, {
        isFetchingMarkdown: false,
        markdown: action.payload,
      });
    case GET_MARKDOWN_FAILURE:
      return Object.assign({}, state, {
        isFetchingMarkdown: false,
      });
    case UPDATE_MARKDOWN_REQUEST:
      return Object.assign({}, state, {
        isFetchingMarkdown: true,
      });
    case UPDATE_MARKDOWN_SUCCESS:
      return Object.assign({}, state, {
        isFetchingMarkdown: false,
        markdown: action.payload,
      });
    case UPDATE_MARKDOWN_FAILURE:
      return Object.assign({}, state, {
        isFetchingMarkdown: false,
      });
    case ANNEX_READY:
      return {
        ...state,
        annexes: {
          ...state.annexes,
          [action.key]: {
            ...state.annexes[action.key],
            [`${action.key}Ready`]: true,
          },
        },
      };
    case 'UPDATE_ANNEX_TABLE_SUCCESS':
      return {
        ...state,
        annexes: {
          ...state.annexes,
          [action.storeAnnexKey]: {
            ...state.annexes[action.storeAnnexKey],
            [action.storeAnnexTableKey]: {
              ...action.data
            },
          },
        },
      };
    default:
      return state;
  }
}
