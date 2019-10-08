import React from 'react';
import Layout from '../components/Layout';
import Helmet from 'react-helmet';
import Sections from '../components/Layout/Sections';

const sections = [
  {
    title: 'Playground',
    body: <p>Hier werden Dinge ausprobiert.</p>,
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
