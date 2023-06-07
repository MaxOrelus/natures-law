(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define([], factory);
  } else if (typeof exports === 'object') {
    // Node, CommonJS-like
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    root.returnExports = factory();
  }
}(typeof self !== 'undefined' ? self : this, () => {

  const naturesLaw = (fn, errorFn) => {
    const isAsync = fn[Symbol.toStringTag] === 'AsyncFunction';

    if (isAsync) {
      return async (...args) => {
        try {
          return await fn(...args)
        } catch (error) {
          errorFn(error)
        }
      }
    }

    return (...args) => {
      try {
        return fn(...args)
      } catch (error) {
        errorFn(error)
      }
    }
  }

  return naturesLaw;

}));
