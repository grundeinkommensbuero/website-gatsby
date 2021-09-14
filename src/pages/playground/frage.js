import React from 'react';
import Layout from '../../components/Layout';
import { Helmet } from 'react-helmet-async';
import { SectionWrapper, Section } from '../../components/Layout/Sections';
import ListQuestions from '../../components/QuestionUbi/ListQuestions';

const PlaygroundQuestion = () => {
  return (
    <Layout>
      <Helmet>
        <title>Playground</title>
      </Helmet>
      <SectionWrapper>
        <Section title="">
          <ListQuestions />
        </Section>
      </SectionWrapper>
    </Layout>
  );
};

export default PlaygroundQuestion;
