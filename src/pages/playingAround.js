import React, { Component, useState } from 'react';
import { useGlobalState, useAuthentication } from '../hooks/Authentication';

export default class PlayingAround extends Component {
  render() {
    return <TestComponent></TestComponent>;
  }
}

const TestComponent = () => {
  const [signUp] = useAuthentication();
  const [state, setState] = useState({ value: '' });
  const context = useGlobalState();
  console.log('context inside header', context);
  return (
    <div>
      <button onClick={() => signUp('valentin@grundeinkommensbuero.de')}>
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
