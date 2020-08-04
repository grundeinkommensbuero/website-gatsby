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
          campaignCode="bremen-1"
          successMessage="Danke! Bitte schicke die Listen möglichst schnell an: Svenja Heer, Borchshöher Straße 168 b, 28755 Bremen"
        />
      </SectionWrapper>
    </Layout>
  );
};
