/**
 * Util functions (or shared functionality which is needed
 * multiple timmes) to use within the hooks
 */

export const sleep = milliseconds => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
};
