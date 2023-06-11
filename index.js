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

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  const freeze = Object.freeze;
  const nullFn = freeze(() => null);

  const log = freeze((fn) => {
    return (str) => {
      if (typeof str === 'string') {
        return console.log(`[natures-law][fn:${fn.name ? fn.name : "anonymous"}] ${str}`);
      }
    }
  });

  const law = freeze((fn, errorFn) => {
    const is_form_async = freeze(fn[Symbol.toStringTag] === 'AsyncFunction');
    const is_error_async = freeze(errorFn[Symbol.toStringTag] === 'AsyncFunction')

    if (is_error_async) {
      return freeze(async () => {
        throw new Error(`[natures-law][fn:${fn.name ? fn.name : "anonymous"}] Async function detected in natures-error. A moment only happens once. Potential is either fulfilled or wasted. Use this area to train your mind to be more aware of the potential of your code.`)
      });
    }

    if (is_form_async) {
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

  const retry = freeze(async (law, seed, max_retries = 3, delay_ms = 1000) => {
    var retries = 0;

    while (retries < max_retries) {
      try {
        var potential = await law(seed);

        if (potential !== null) {
          return potential;
        }
        retries++;

        await delay(delay_ms);
      } catch (error) {
        console.log(`[natures-law][retry] only accepts natures-law wrapped functions`);
        return nullFn();
      }
    }

    return nullFn();
  });

  const nature = freeze({
    law,
    retry
  });

  return nature;

}));
