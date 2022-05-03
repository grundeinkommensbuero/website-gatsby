import React, { useContext } from 'react';
import Layout from '../../../components/Layout';
import {
  SectionWrapper,
  Section,
  SectionInner,
} from '../../../components/Layout/Sections';
import * as s from './style.module.less';
import AvatarImage from '../../../components/AvatarImage';
import { CTALink, CTALinkExternal } from '../../../components/Layout/CTAButton';
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
                  wirst, dich mit anderen vernetzt und Sammelevents planst! Wenn
                  du mitsammeln oder selbst ein Event planen willst, kannst du
                  das über einen dieser Wege:
                </p>

                <h3>Über die Website</h3>
                <CTALink to="/berlin/termine#karte">Zur Sammelkarte</CTALink>

                <h3>Über die Sammelapp</h3>
                <CTALinkExternal href="https://play.google.com/store/apps/details?id=berlin.sammelapp">
                  Zur Android App
                </CTALinkExternal>
                <br />
                <br />
                <CTALinkExternal href="https://apps.apple.com/us/app/berliner-sammel-app/id1619980654">
                  Zur iOS App
                </CTALinkExternal>
              </div>
            </div>
          </SectionInner>
        </Section>
      </SectionWrapper>
    </Layout>
  );
};

export default CollectorNextStepsPage;
