import React from 'react';
import Layout from '../../../components/Layout';
import { SectionWrapper } from '../../../components/Layout/Sections';
import SelfScan from '../../../components/Forms/SelfScan';
import Helmet from 'react-helmet';

export default () => {
  return (
    <Layout>
      <Helmet>
        <title>Selbsteingabe Unterschriftsliste</title>
      </Helmet>

      <SectionWrapper>
        <SelfScan
          campaignCode="hamburg-1"
          successMessage="Danke! Bitte schicke die Listen möglichst schnell an: Expedition Grundeinkommen, Am Langenzug 12, 12085 Hamburg"
        />
      </SectionWrapper>
    </Layout>
  );
};
