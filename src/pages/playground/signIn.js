import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { Helmet } from 'react-helmet-async';
import {
  SectionWrapper,
  Section,
  SectionInner,
} from '../../components/Layout/Sections';
import { useSignIn, useAnswerChallenge } from '../../hooks/Authentication';

export default () => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [signInState, signIn] = useSignIn();
  const [, answerChallenge] = useAnswerChallenge();

  console.log('sign in state', signInState);

  return (
    <Layout>
      <Helmet>
        <title>Playground</title>
      </Helmet>
      <SectionWrapper>
        <Section title="Login">
          <SectionInner wide={true}>
            {signInState !== 'success' && (
              <>
                <h2>Email</h2>
                <form
                  onSubmit={e => {
                    e.preventDefault();
                    signIn(email);
                  }}
                >
                  <input
                    type="text"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    aria-label="just a test hey"
                  />
                </form>
              </>
            )}
            {signInState === 'success' && (
              <>
                <h2>Challenge</h2>
                <form
                  onSubmit={e => {
                    e.preventDefault();
                    answerChallenge(code);
                  }}
                >
                  <input
                    type="text"
                    value={code}
                    onChange={e => setCode(e.target.value)}
                    aria-label="just a test hey"
                  />
                </form>
              </>
            )}
          </SectionInner>
        </Section>
      </SectionWrapper>
    </Layout>
  );
};
