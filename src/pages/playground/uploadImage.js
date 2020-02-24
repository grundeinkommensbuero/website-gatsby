import React from 'react';
import Layout from '../../components/Layout';
import Helmet from 'react-helmet';
import {
  SectionWrapper,
  Section,
  SectionInner,
} from '../../components/Layout/Sections';
import Map from '../../components/Map';
import { useUploadImage } from '../../hooks/images';

export default () => {
  const [state, uploadImage] = useUploadImage();

  console.log('state', state);
  return (
    <Layout>
      <Helmet>
        <title>Playground</title>
      </Helmet>
      <SectionWrapper>
        <Section title="karte">
          <SectionInner wide={true}>
            <input
              type="file"
              onChange={e =>
                uploadImage(
                  '53b95dd2-74b8-49f4-abeb-add9c950c7d9',
                  e.target.files[0]
                )
              }
            />
          </SectionInner>
        </Section>
      </SectionWrapper>
    </Layout>
  );
};
