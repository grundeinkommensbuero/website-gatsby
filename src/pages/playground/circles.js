import React from 'react';
import Layout from '../../components/Layout';
import { Helmet } from 'react-helmet-async';
import { SectionWrapper } from '../../components/Layout/Sections';
import CirclesPink from '@circles-pink/web-client';

const Circles = () => {
  return (
    <Layout>
      <Helmet>
        <title>Circles Pink</title>
      </Helmet>
      <SectionWrapper>
        <CirclesPink />
      </SectionWrapper>
    </Layout>
  );
};

export default Circles;
