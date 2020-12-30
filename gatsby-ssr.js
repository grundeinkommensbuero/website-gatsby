import React from 'react';
import wrapWithProvider from './wrap-with-provider';
import { CounterWrapper } from './test';

export const wrapRootElement = wrapWithProvider;

export const wrapPageElement = ({ element, props }) => {
  return <CounterWrapper {...props}>{element}</CounterWrapper>;
};

/*  TODO: also needed here?

window.commitHash = COMMITHASH;
window.version = VERSION;
*/
