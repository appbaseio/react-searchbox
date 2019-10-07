export const getClassName = (classMap, component) =>
  (classMap && classMap[component]) || '';

/**
 * To determine wether an element is a function
 * @param {any} element
 */
export const isFunction = element => typeof element === 'function';

export const getComponent = (data = {}, props = {}) => {
  const { children, render } = props;
  // Render function as child
  if (isFunction(children)) {
    return children(data);
  }
  // Render function as render prop
  if (isFunction(render)) {
    return render(data);
  }
  return null;
};

export const hasCustomRenderer = (props = {}) => {
  const { render, children } = props;
  return isFunction(children) || isFunction(render);
};

export const deepGet = (obj, keys) =>
  keys.reduce((xs, x) => (xs && xs[x] ? xs[x] : null), obj);

export const equals = (a, b) => {
  if (a === b) return true;
  if (!a || !b || (typeof a !== 'object' && typeof b !== 'object'))
    return a === b;
  if (a === null || a === undefined || b === null || b === undefined)
    return false;
  if (a.prototype !== b.prototype) return false;
  let keys = Object.keys(a);
  if (keys.length !== Object.keys(b).length) return false;
  return keys.every(k => equals(a[k], b[k]));
};
