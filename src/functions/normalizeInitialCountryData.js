import { countries } from './../constants/countries'

export default function normalizeInitialCountryData(initialCountry) {
    let country = countries.filter(country => country.label === initialCountry);
    return country[0];
};