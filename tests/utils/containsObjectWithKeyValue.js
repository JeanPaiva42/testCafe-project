export const containsObjectWithKeyValue = (array, key, value) => {
    return array.some(obj => obj[key] === value);
}