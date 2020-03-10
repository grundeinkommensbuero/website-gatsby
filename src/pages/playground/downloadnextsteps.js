import React from 'react';
import Layout from '../../components/Layout';
import { Helmet } from 'react-helmet-async';
import Sections from '../../components/Layout/Sections';
import DownloadListsNextSteps from '../../components/Forms/DownloadListsNextSteps';

const sections = [
  {
    title: 'Download fertig.',
    bodyTextSizeHuge: true,
    body: (
      <>
        <p>Super, der Download hat geklappt. Die nächsten Schritte:</p>
        <DownloadListsNextSteps needsVerification={true} />
      </>
    ),
  },
];

export default function DesignSystem() {
  return (
    <Layout title="Design System">
      <Helmet>
        <title>Playground</title>
      </Helmet>
      <Sections sections={sections}></Sections>
    </Layout>
  );
}
