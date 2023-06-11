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
  const prototype = freeze(Function.prototype)
  const nullFn = freeze(() => null);

  const log = freeze((fn) => {
    return (str) => {
      if (typeof str === 'string') {
        return console.log(`[natures-law][fn:${fn.name}] ${str}`);
      }
    }
  });

  const law = freeze((fn = prototype, errorFn = prototype) => {
    const is_not_function = freeze(typeof fn !== 'function');
    const is_not_error_function = freeze(errorFn && typeof errorFn !== 'function');
    const is_anonymous = freeze(fn.name ? false : true);
    const is_form_async = freeze(fn[Symbol.toStringTag] === 'AsyncFunction');
    const is_error_async = freeze(errorFn[Symbol.toStringTag] === 'AsyncFunction')

    if (is_not_function) {
      return freeze(async () => {
        throw new Error("[natures-error] Function not detected in natures-law. An idea is only as good as its form. Provide a function to natures-law to give it form.")
      });
    }

    if (is_not_error_function) {
      return freeze(async () => {
        throw new Error("[natures-error] Error function not detected in natures-law. Reflection is the key to understanding. Provide a function to natures-law to log errors or don't provide anything at all.")
      });
    }

    if (is_anonymous) {
      return freeze(async () => {
        throw new Error("[natures-error][fn:anonymous] Anonymous function detected in natures-law. Understanding the path is part of the journey. Trace the experience back to the source and give it a name.")
      });
    }

    if (is_error_async) {
      return freeze(async () => {
        throw new Error(`[natures-error][fn:${fn.name}] Async function detected in natures-law. A moment only happens once. Potential is either fulfilled or wasted. Use this area to train your mind to be more aware of the potential of your code.`)
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
        console.error(error.message);
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
