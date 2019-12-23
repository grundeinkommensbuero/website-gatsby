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
        <title>Selbsteingabe Unterschriftsliste</title>
      </Helmet>

      <SectionWrapper>
        <Section title="Unterschriften zählen">
          <SectionInner hugeText={true}>
            Du hast den Code auf einer Unterschriftsliste gescannt.
            Bitte sag uns, wie viele Unterschriften drauf sind.
          </SectionInner>
          <SectionInner hugeText={true}>
            <SelfScan />
          </SectionInner>
        </Section>
      </SectionWrapper>
    </Layout>
  );
};
