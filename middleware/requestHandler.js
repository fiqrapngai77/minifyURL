/**
 * Wrap this around requests to catch errors
 * It is a try-catch wrapper for each route
 *
 * @param {Function} fn
 */

export const requestHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
