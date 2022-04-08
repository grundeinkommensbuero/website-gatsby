import React, { useContext } from 'react';
import Layout from '../../../components/Layout';
import {
  SectionWrapper,
  Section,
  SectionInner,
} from '../../../components/Layout/Sections';
import * as s from './style.module.less';
import AvatarImage from '../../../components/AvatarImage';
import { CTALink } from '../../../components/Layout/CTAButton';
import AuthContext from '../../../context/Authentication';

const CollectorNextStepsPage = () => {
  const { customUserData } = useContext(AuthContext);

  return (
    <Layout>
      <SectionWrapper>
        <Section colorScheme="white" className={s.section}>
          <SectionInner wide={true}>
            <div className={s.container}>
              <div className={s.avatarContainer}>
                <AvatarImage user={customUserData} className={s.avatar} />
              </div>

              <div className={s.content}>
                <p>
                  Hallo {customUserData?.username}! <br />
                  Danke, dass du mitsammelst. Wir melden uns bei dir, wenn wir
                  eine Aktion planen. Bitte hilf uns, indem du selbst aktiv
                  wirst, dich mit anderen vernetzt und Sammelevents planst!
                  Folgendes kannst du jetzt tun:
                </p>

                <h3>Mitsammeln oder ein Event planen</h3>
                <CTALink to="/aktiv-werden">Aktiv werden</CTALink>

                <h3>Dich mit anderen in deinem Kiez vernetzen</h3>
                <CTALink to="/aktiv-werden">Vernetze dich</CTALink>
              </div>
            </div>
          </SectionInner>
        </Section>
      </SectionWrapper>
    </Layout>
  );
};

export default CollectorNextStepsPage;
