import {
  ApolloClient,
  ApolloError,
  ApolloLink,
  InMemoryCache,
  Observable,
  from,
} from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';

import endpoints from '../constants/endpoints';

// TODO (edimov): `errorHandlerMiddlewre` is in place to cater for 5xx, 4xx
// responses with no body from the backend service, as apollo client will
// always try to unmarshall the `response.body`, resulting in
// `Unexpected token < in JSON at position 1` error.
// Once linked issue is resolved the middleware logic should be refactored.
//
// https://github.com/apollographql/apollo-feature-requests/issues/153
function errorHandlerMiddlewre(operation, next) {
  return new Observable(observer => {
    const subscription = next(operation).subscribe({
      next: result => observer.next(result),
      error: () => {
        return new ApolloError({ errorMessage: 'Oops what a mess... something went wrong! Please try again later.' });
      },
      complete: observer.complete.bind(observer),
    });

    return () => subscription.unsubscribe();
  });
}

const httpLink = createUploadLink({ uri: `${endpoints.SERVER}/query`, credentials: 'include' });
const errLink = new ApolloLink(errorHandlerMiddlewre);

const client = new ApolloClient({
  link: from([
    errLink,
    httpLink,
  ]),
  cache: new InMemoryCache(),
});

export default client;
