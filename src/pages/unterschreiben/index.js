import React from 'react';
import Layout from '../../components/Layout';
import {
  SectionWrapper,
  Section,
  SectionInner,
} from '../../components/Layout/Sections';

import { SignatureListJourney } from '../../components/SignatureListJourney';
import * as s from './style.module.less';

const JourneyPage = () => {
  return (
    <Layout>
      <SectionWrapper>
        <Section colorScheme="violet" className={s.section}>
          <SectionInner wide={true}>
            <SignatureListJourney />
          </SectionInner>
        </Section>
      </SectionWrapper>
    </Layout>
  );
};

export default JourneyPage;
