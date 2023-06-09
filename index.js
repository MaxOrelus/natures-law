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

  const freeze = Object.freeze;
  const nullFn = freeze(() => null);

  const log = freeze((fn) => {
    return (str) => {
      if (typeof str === 'string') {
        return console.log(`[natures-law][fn:${fn.name ? fn.name : "anonymous"}] ${str}`);
      }
    }
  });

  const naturesLaw = freeze((fn, errorFn) => {
    const isAsync = freeze(fn[Symbol.toStringTag] === 'AsyncFunction');

    if (isAsync) {
      return freeze(async (...args) => {
        try {
          return freeze(await fn(...args))
        } catch (error) {
          errorFn(log(fn), error)
          return nullFn()
        }
      });
    }

    return freeze((...args) => {
      try {
        return freeze(fn(...args))
      } catch (error) {
        errorFn(log(fn), error)
        return nullFn()
      }
    });
  });

  return naturesLaw;

}));
