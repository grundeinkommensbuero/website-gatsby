import React from 'react';
import Layout from '../../../components/Layout';
import {
  SectionWrapper,
  Section,
  SectionInner,
} from '../../../components/Layout/Sections';
import SelfScan from '../../../components/Forms/SelfScan';
import Helmet from 'react-helmet';

export default () => {
  return (
    <Layout>
      <Helmet>
        <title>Selbsteingabe Unterschriftenlist</title>
      </Helmet>

      <SectionWrapper>
        <Section title="Trag deine Unterschriften ein">
          <SectionInner hugeText={true}>
            Sehr gut, du hast den Code auf einer Unterschriftenliste gescannt!
            Bitte sage uns, wie viel Unterschriften drauf sind.
          </SectionInner>
          <SectionInner hugeText={true}>
            <SelfScan />
          </SectionInner>
        </Section>
      </SectionWrapper>
    </Layout>
  );
};
