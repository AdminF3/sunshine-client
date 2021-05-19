export default function deepCopyFunction(data) {
    let dataToReturn = {};
    let value;
    let key;

    if (typeof data !== 'object' || data === null) {
        return data;
    }

    dataToReturn = Array.isArray(data) ? [] : {};

    for (key in data) {
        value = data[key];

        dataToReturn[key] = deepCopyFunction(value);
    }

    return dataToReturn;
}