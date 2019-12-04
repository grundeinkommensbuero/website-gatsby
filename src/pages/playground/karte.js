import React from 'react';
import Layout from '../../components/Layout';
import Helmet from 'react-helmet';
import Sections from '../../components/Layout/Sections';
import Map from '../../components/Map';

const points = [
  {
    position: [10.1486, 54.3119],
    label: 'Marktplatz, 13.12.19 15 Uhr',
  },
  {
    position: [9.0637, 54.367],
    label: 'Am Rathaus, 13.12.19 11 Uhr',
  },
];

const sections = [
  {
    title: 'karte.',
    bodyTextSizeHuge: true,
    body: <Map points={points} bounds={[8.226, 53.4095, 11.6428, 54.9823]} />,
  },
];

export default () => {
  return (
    <Layout>
      <Helmet>
        <title>Playground</title>
      </Helmet>
      <Sections sections={sections}></Sections>
    </Layout>
  );
};
