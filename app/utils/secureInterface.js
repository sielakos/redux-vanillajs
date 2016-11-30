export function secureInterface(target, {privatePrefix = '_', usePrototype = true, extraProperties = [], ...decoratorOptions} = {}) {
  const decorators = getKeys(target, usePrototype)
    .concat(extraProperties)
    .reduce((decorators, key) => {
      if (isPublic(key, privatePrefix)) {
        return {
          ...decorators,
          [key]: decorateValue(target, target[key], decoratorOptions)
        };
      }

      return decorators;
    }, {});

  return Object.create({}, decorators);
}

function getKeys(target, usePrototype) {
  if (!usePrototype) {
    return Object.keys(target);
  }

  return getKeysIncludingPrototype(target);
}

function getKeysIncludingPrototype(obj) {
  let keys = [];

  for (let key in obj) {
    keys.push(key);
  }

  return keys;
}

function isPublic(key, privatePrefix) {
  return key.substr(0, privatePrefix.length) !== privatePrefix;
}

function decorateValue(object, value, {writable = true}) {
  const decorator = {
    value: value,
    enumerable: true,
    writable: writable
  };

  if (typeof value === 'function') {
    return {
      ...decorator,
      value: value.bind(object)
    };
  }

  return decorator;
}
