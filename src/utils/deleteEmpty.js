export default function deleteEmpty(data) {
    for (const el in data) {
        if (data[el] === null || data[el] === undefined) {
          delete data[el];
        }
    }
}