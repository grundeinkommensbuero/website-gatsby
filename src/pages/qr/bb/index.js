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
            <SelfScan successMessage="Danke! Bitte schicke die Listen möglichst schnell an: Expedition Grundeinkommen, Karl-Marx-Straße 50, 12043 Berlin." />
          </SectionInner>
        </Section>
      </SectionWrapper>
    </Layout>
  );
};
