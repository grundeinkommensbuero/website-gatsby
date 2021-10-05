import { navigate } from '@reach/router';
import React, { useContext, useEffect } from 'react';
import {
  Section,
  SectionInner,
  SectionWrapper,
} from '../../components/Layout/Sections';
import AuthContext from '../../context/Authentication';
import Layout from '../../components/Layout';
import { FinallyMessage } from '../../components/Forms/FinallyMessage';
import { useLocation } from '@reach/router';

const MePage = () => {
  const { userId } = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    // Get path after me/ to redirect to a specifc subpage of profile
    const splitPath = location.pathname.split('me/');
    const profilePath =
      splitPath.length <= 1 ? '' : splitPath[splitPath.length - 1];

    if (userId) {
      navigate(`/mensch/${userId}/${profilePath}${location.search}`);
    } else {
      navigate(`/login/?nextPage=me%2F${profilePath}${location.search}`);
    }
  }, [userId]);

  return (
    <Layout>
      <SectionWrapper>
        <Section>
          <SectionInner>
            <FinallyMessage type="progress">Lade...</FinallyMessage>
          </SectionInner>
        </Section>
      </SectionWrapper>
    </Layout>
  );
};

export default MePage;
