import React from 'react';
import Layout from '../../components/Layout';
import {
  SectionWrapper,
  Section,
  SectionInner,
} from '../../components/Layout/Sections';

import { SignatureListJourney } from '../../components/SignatureListJourney';
import * as s from './style.module.less';

const JourneyPage = ({ location }) => {
  return (
    <Layout>
      <SectionWrapper>
        <Section colorScheme="white" className={s.section}>
          <SectionInner wide={true}>
            <SignatureListJourney pdfUrl={location?.state?.pdfUrl} />
          </SectionInner>
        </Section>
      </SectionWrapper>
    </Layout>
  );
};

export default JourneyPage;
