// ================= APP SETUP =================
import React from 'react';
import ReactDOM from 'react-dom';

import { ApolloProvider } from '@apollo/react-components';

// import GA
import ReactGA from 'react-ga';

// import redux stuff
import reducer from './reducers';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'; // for async actions
// connect react to redux store (mapStateToProps, mapDispatchToProps)
import { Provider } from 'react-redux';

// import routing logic
import mainRoutes from './constants/mainRoutes';
import browserHistory from './components/routing/browserHistory';

import PageWrapper from './containers/smartcomponents/PageWrapper';
import Router from './components/routing/Router';

// ================= UI SETUP =================
import 'react-leaflet-markercluster/dist/styles.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import './index.css';
import './styles/flexboxgrid.css'; // flexboxgrid classNames for easy layout
import './styles/custom.css'; // custom made styles for various UI elements
import './styles/leaflet.css';
import {
  ThemeProvider as MuiThemeProvider,
  CssBaseline,
  createMuiTheme,
} from '@material-ui/core';

// ================= Multilanguage Support =================
import { I18nextProvider } from 'react-i18next';
import i18next from './constants/i18n';

import apolloClient from './utils/apolloClient';

// ================= Redux Store & Middleware =================
// State
import { loadState, saveState } from './localStorage';
import throttle from 'lodash/throttle'; // import only this function to prevent useless javascript being included in the project
const persistedState = loadState(); // load state from local storage

// Redux Devtools is a Chrome extention for better debugging and developer exprience
const composeEnhancers =
  process.env.NODE_ENV !== 'production' && typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ :
    compose;
// Create the store from the reducers initial state
// if there is a persisted state in the local storage, override the initial state and use persisted state instead
const store = createStore(reducer, persistedState, composeEnhancers(applyMiddleware(thunk)));
// Save serialized sate every time a change occurs.
// lodash.throttle prevents from calling this function too often.
// It is called at most 1 time every 1000ms (1 second)
store.subscribe(throttle(() => {
  const state = store.getState();
  saveState({
    user: state.user,
    alerts: state.alerts
  });
}, 1000)); // allow writing state to local storage only 1 time per second

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    subtitle2: {
      fontWeight: 600,
    },
  },
  palette: {
    primary: {
      main: '#5088D9',
      dark: '#385f97',
      contrastText: '#fff',
    },
    secondary: {
      light: '#fef9d0',
      main: '#fbe960',
      dark: '#fec144',
      contrastText: '#000',
    },
    error: {
      light: '#f44336',
      main: '#cc3333',
      dark: '#c0392b',
      contrastText: '#fff',
    },
  },
  overrides: {
    MuiTooltip: {
      tooltip: {
        fontSize: '1em',
        padding: '8px 20px',
      },
    },
    MuiTableCell: {
      head: {
        fontWeight: 600,
      },
    },
  },
});

ReactGA.initialize('UA-140489300-1'); // Google Analytics
ReactGA.pageview(window.location.pathname + window.location.search); // Google Analytics

browserHistory.listen((l) => {
  // Do not track the untrackable.
  if (mainRoutes.some((r) => r.path === l.pathname && r.track === false)) {
    return;
  }

  ReactGA.pageview(l.pathname + l.search);
});
// ================= REACT INIT =================
ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <I18nextProvider i18n={i18next()}>
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <Router
            history={browserHistory}
            routesConfig={mainRoutes}
            wrapper={PageWrapper}
          />
        </MuiThemeProvider>
      </Provider>
    </I18nextProvider>
  </ApolloProvider>,
  document.getElementById('root')
);
