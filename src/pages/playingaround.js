import React, { Component, useState } from 'react';
import { useGlobalState, useAuthentication } from '../hooks/Authentication';
import { useSignaturesApi } from '../hooks/Api/Signatures';

export default class PlayingAround extends Component {
  render() {
    return <TestComponent></TestComponent>;
  }
}

const TestComponent = () => {
  const [
    state,
    createSignatureListOldUser,
    createSignatureListNewUser,
    createSignatureListAnonymous,
  ] = useSignaturesApi();
  console.log('state', state);
  return (
    <div>
      <button
        onClick={() =>
          createSignatureListNewUser({ email: 'vali_schagerl@web.de' })
        }
      >
        Click me
      </button>
      <p>{state === null ? 'no state' : state}</p>
    </div>
  );
};
