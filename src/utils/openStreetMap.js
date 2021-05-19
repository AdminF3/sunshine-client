import { query } from './url';

const url = 'https://nominatim.openstreetmap.org';

/**
 * search searches for an address.
 *
 * @param {String} q - Query string to search for.
 *
 * @returns {Promise} - The response JSON stream.
 */
export function search(q) {
  return awaiter(() => request('search', { q }));
}

/**
 * reverse performs a reverse geocoding search for
 * lat lang.
 *
 * @param {String} p - { lat, lng } object.
 *
 * @returns {Promise} - The response JSON stream.
 */
export function reverse({ lat, lng }) {
  return awaiter(() => request('reverse', { lat, lon: lng }));
}

function awaiter(fn) {
    const generator = fn();

    function resolve(next) {
      if (next.done) {
        return Promise.resolve(next.value);
      }

      return Promise.resolve(next.value).then(response => {
        return resolve(generator.next(response));
      });
    }

    return resolve(generator.next());
}

function* request(path, params) {
  const q = query({
    format: 'json',
    addressdetails: 1,
    namedetails: 1,
    ...params,
  });

  const response = yield fetch(`${url}/${path}?${q}`);
  const json = yield response.json();

  return json;
}
