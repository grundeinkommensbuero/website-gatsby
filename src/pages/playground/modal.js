import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { Helmet } from 'react-helmet-async';
import { SectionWrapper, Section } from '../../components/Layout/Sections';
import { Modal } from '../../components/Modal';

const PlaygroundModal = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <Layout>
      <Helmet>
        <title>Modal</title>
      </Helmet>
      <SectionWrapper>
        <Section title="Modal">
          <button onClick={() => setShowModal(true)}>Open Modal</button>
          <Modal showModal={showModal} setShowModal={setShowModal}>
            <h2>I am a happy modal content</h2>
          </Modal>
        </Section>
      </SectionWrapper>
    </Layout>
  );
};

export default PlaygroundModal;
