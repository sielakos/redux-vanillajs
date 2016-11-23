export function pipe(firstFunc, ...otherFunc) {
  return (...args) => {
    return otherFunc.reduce((result, func) => {
      return func(result);
    }, firstFunc(...args));
  };
}
