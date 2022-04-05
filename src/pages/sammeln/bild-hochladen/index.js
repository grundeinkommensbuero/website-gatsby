import React, { useContext, useEffect, useState } from 'react';
import Layout from '../../../components/Layout';
import {
  SectionWrapper,
  Section,
  SectionInner,
} from '../../../components/Layout/Sections';
import { FinallyMessage } from '../../../components/Forms/FinallyMessage';
import ImageUpload from '../../../components/Forms/ImageUpload';
import AuthContext from '../../../context/Authentication';
import { Button, InlineButton } from '../../../components/Forms/Button';
import * as s from './style.module.less';
import { navigate } from 'gatsby';

const CollectorImageUploadPage = () => {
  const { customUserData, userId, isAuthenticated } = useContext(AuthContext);

  const [buttonIsDisabled, setButtonIsDisabled] = useState(
    !customUserData?.profilePictures
  );

  useEffect(() => {
    if (customUserData?.profilePictures) {
      setButtonIsDisabled(false);
    }
  }, [customUserData]);

  // If not authenticated we want to navigate to anmeldung page
  useEffect(() => {
    if (isAuthenticated === false) {
      navigate('/sammeln/anmeldung');
    }
  }, [isAuthenticated]);

  return (
    <Layout>
      <SectionWrapper>
        <Section colorScheme="white" className={s.section}>
          <SectionInner wide={true} className={s.container}>
            <div className={s.content}>
              <FinallyMessage>
                Willkommen bei der Expedition! Wenn du möchtest, lad doch ein
                Foto hoch.
              </FinallyMessage>

              <h3>Zeig Gesicht fürs Grundeinkommen</h3>
              <p>
                Lade dein Profilfoto hoch, und zeige der Welt, dass du
                Grundeinkommen ausprobieren willst.
              </p>

              <ImageUpload
                userData={customUserData}
                userId={userId}
                size={'large'}
                onUploadDone={() => setButtonIsDisabled(false)}
                onImageChosen={() => setButtonIsDisabled(true)}
              />

              <div className={s.buttonContainer}>
                <div>
                  <Button
                    onClick={() => navigate('/sammeln/aktiv-werden')}
                    disabled={buttonIsDisabled}
                    className={s.button}
                  >
                    Weiter
                  </Button>
                </div>
                <div>
                  <InlineButton
                    aria-label={'Schritt überspringen'}
                    onClick={() => navigate('/sammeln/aktiv-werden')}
                    className={s.button}
                  >
                    Jetzt nicht
                  </InlineButton>
                </div>
              </div>
            </div>
          </SectionInner>
        </Section>
      </SectionWrapper>
    </Layout>
  );
};

export default CollectorImageUploadPage;
