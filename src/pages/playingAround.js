import React, { Component, useState } from 'react';
import { useGlobalState, useAuthentication } from '../hooks/Authentication';

export default class PlayingAround extends Component {
  render() {
    return <TestComponent></TestComponent>;
  }
}

const TestComponent = () => {
  const [startSignInProcess, answerCustomChallenge] = useAuthentication();
  const context = useGlobalState();
  const [state, setState] = useState({ value: '' });
  console.log('context inside header', context);
  return (
    <div>
      <button
        onClick={() =>
          startSignInProcess('valentin@grundeinkommensbuero.de', context)
        }
      >
        Click me
      </button>
      <input
        type="text"
        value={state.value}
        onChange={e => setState({ value: e.target.value })}
      ></input>
      <button onClick={() => answerCustomChallenge(state.value, context)}>
        Send code
      </button>
    </div>
  );
};
