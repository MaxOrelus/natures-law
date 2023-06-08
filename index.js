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

  const nullFn = () => null;

  const log = (fn) => {
    return (str) => {
      if (typeof str === 'string') {
        console.log(`[natures-law][fn:${fn.name}] ${str}`);
      }
    }
  }

  const naturesLaw = (fn, errorFn) => {
    const isAsync = fn[Symbol.toStringTag] === 'AsyncFunction';

    if (isAsync) {
      return async (...args) => {
        try {
          return await fn(...args)
        } catch (error) {
          errorFn(log(fn), error)
          return nullFn()
        }
      }
    }

    return (...args) => {
      try {
        return fn(...args)
      } catch (error) {
        errorFn(log(fn), error)
        return nullFn()
      }
    }
  }

  return naturesLaw;

}));
