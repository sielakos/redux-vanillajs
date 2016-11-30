export function flatten(values) {
  if (!Array.isArray(values)) {
    return values;
  }

  return values.reduce((values, value) => {
    return values.concat(flatten(value));
  }, [])
}
