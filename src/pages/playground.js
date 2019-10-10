import React from 'react';
import Layout from '../components/Layout';
import Helmet from 'react-helmet';
import Sections from '../components/Layout/Sections';
import Pledge from '../components/Forms/Pledge';

const sections = [
  {
    title: 'Playground',
    body: <Pledge />,
  },
];

export default function DesignSystem() {
  return (
    <Layout title="Design System">
      <Helmet>
        <title>Playground</title>
        )}
      </Helmet>
      <Sections sections={sections}></Sections>
    </Layout>
  );
}
