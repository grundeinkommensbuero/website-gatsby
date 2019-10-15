import React from 'react';
import Layout from '../components/Layout';
import Helmet from 'react-helmet';
import Sections from '../components/Layout/Sections';
import Pledge from '../components/Forms/Pledge';

const sections = [
  {
    title: 'Bist du dabei?',
    bodyTextSizeHuge: true,
    body: (
      <>
        <p>
          Um zum Ziel zu kommen, brauchen wir viele Unterstützer. Gibt uns ein
          bisschen Info, damit wir dich passend kontaktieren können, wenn es
          soweit ist:
        </p>
        <Pledge />
      </>
    ),
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
