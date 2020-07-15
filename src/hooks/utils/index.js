/**
 * Util functions (or shared functionality which is needed
 * multiple timmes) to use within the hooks
 */

import querystring from 'query-string';

export const sleep = milliseconds => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
};

export const getReferral = () => {
  // check url params, if current user came from referral (e.g newsletter)
  const urlParams = querystring.parse(window.location.search);
  // the pk_source param was generated in matomo
  return urlParams.pk_source;
};
