import { labelFromCC } from '../../constants/countries';

/**
 * locationToAddressMap maps `assetLocation` object to
 * `adressMap` object.
 *
 * @param {Object} assetLocation - A react-leaflet location
 * object.
 *
 * @returns {Object} - The `adressMap` object.
 */
export function locationToAddressMap(assetLocation) {
  if (!assetLocation || !assetLocation.address) {
    return {};
  }

  return {
    streetAddress: locationToStreetAddress(assetLocation),
    city: assetLocation.address.city,
    postcode: assetLocation.address.postcode,
    country: labelFromCC(assetLocation.address.country_code.toUpperCase(), assetLocation.address.country),
  };
}

/**
 * parseAddress parses a JSON.stringified addressMap
 * object to structured string.
 *
 * @param {String} m - Stringified addressMap
 * @param {Object} options - Options for the output string
 * object or string.
 *
 * @returns {String} - The structured address string.
 */
export function parseAddress(m, options = { short: false}) {
  try {
    const am = JSON.parse(m);

    if (options.short) {
      return am.streetAddress;
    }

    return `${am.postcode} ${am.streetAddress}, ${am.city}, ${am.country}`;
  } catch {
    return m;
  }
}

/**
 * addressToJSON unmarshals a JSON string to `addressMap` with
 * optional default object.
 *
 * @param {String} address - Stringified addressMap
 * object or string.
 * @param {Object} defaultJSON - Default object values to
 * be used on error.
 *
 * @returns {Object} - The `adressMap` object.
 */
export function addressToJSON(address, defaultJSON) {
  try {
    return JSON.parse(address);
  } catch (err) {
    return {
      city: '',
      country: '',
      streetAddress: address,
      postcode: '',
      ...defaultJSON,
    };
  }
}

/**
 * addressMapStringify stringifies a JSON `address` object
 * returned by `locationToAddress` func only if `address`
 * is valid.
 *
 * @param {Object} addressMap - Address map object.
 *
 * @returns {String} - The stringidied valid map.
 */
export function addressMapStringify(addressMap) {
  if (!Object.values(addressMap).every(v => Boolean(v))) {
    return '';
  }

  return JSON.stringify(addressMap);
}

/**
 * locationToStreetAddress converts `assetLocation` object
 * to a single street address line.
 *
 * @param {Object} assetLocation - Query string to search for.
 *
 * @returns {String} - The single street address line.
 */
// eslint-disable-next-line complexity
export function locationToStreetAddress(assetLocation) {
  const { display_name, address } = assetLocation;

  if (!display_name) {
    return '';
  }

  if (!address) {
    return display_name;
  }

  const street = (
    address.road ||
    address.pedestrian ||
    address.museum ||
    address.restaurant ||
    ''
  );
  const houseNu = (
    address.house_number ||
    address.building ||
    ''
  );

  return `${street} ${houseNu}`.trim();
}
