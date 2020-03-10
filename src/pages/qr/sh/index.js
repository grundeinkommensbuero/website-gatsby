import React from 'react';
import Layout from '../../../components/Layout';
import { SectionWrapper } from '../../../components/Layout/Sections';
import SelfScan from '../../../components/Forms/SelfScan';
import { Helmet } from 'react-helmet-async';

export default () => {
  return (
    <Layout>
      <Helmet>
        <title>Selbsteingabe Unterschriftsliste</title>
      </Helmet>

      <SectionWrapper>
        <SelfScan
          campaignCode="schleswig-holstein-1"
          successMessage="Danke! Bitte schicke die Listen möglichst schnell an: Johannes Wagner, Postfach 1104, 24585 Nortorf."
        />
      </SectionWrapper>
    </Layout>
  );
};
