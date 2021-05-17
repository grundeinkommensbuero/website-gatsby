import React from 'react';
import Layout from '../../../components/Layout';
import { SectionWrapper } from '../../../components/Layout/Sections';
import SelfScan from '../../../components/Forms/SelfScan';
import { Helmet } from 'react-helmet-async';

const SelfScanB = () => {
  return (
    <Layout>
      <Helmet>
        <title>Selbsteingabe Unterschriftsliste</title>
      </Helmet>

      <SectionWrapper>
        <SelfScan
          campaignCode="berlin-1"
          successMessage="Danke! Bitte schicke die Listen möglichst schnell an: Expedition Grundeinkommen, Karl-Marx-Straße 50, 12043 Berlin"
        />
      </SectionWrapper>
    </Layout>
  );
};

export default SelfScanB;
