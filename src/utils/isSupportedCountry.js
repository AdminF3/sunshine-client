import { supportedCountries } from '../constants/countries';

export default function isSupportedCountry(country) {
    return supportedCountries.includes(country);
}