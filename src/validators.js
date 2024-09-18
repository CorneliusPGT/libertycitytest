export const necessaryField = value =>
{
    if (value)
    {
        return undefined;
    }
    return "Field is necessary"
}


export const maxLengthC = (maxLength) => (value) =>
{
    if (value.length > maxLength)  return alert(`Max length is ${maxLength}`)
    return undefined;
}