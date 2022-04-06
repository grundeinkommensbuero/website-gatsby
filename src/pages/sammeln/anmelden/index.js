import React, { useEffect, useState } from 'react';
import SignUp from '../../../components/Forms/SignUp';
import Layout from '../../../components/Layout';
import {
  SectionWrapper,
  Section,
  SectionInner,
} from '../../../components/Layout/Sections';
import * as s from './style.module.less';
import querystring from 'query-string';
import { formatDate } from '../../../components/utils';
import { navigate } from 'gatsby';

const CollectorSignUpPage = () => {
  // Date and location of collection event, can be passed through query params
  const [date, setDate] = useState();
  const [location, setLocation] = useState();

  useEffect(() => {
    const { date, location } = querystring.parse(window.location.search);

    if (date && location) {
      setDate(date);
      setLocation(location);
    }
  }, []);

  return (
    <Layout>
      <SectionWrapper>
        <Section colorScheme="white" className={s.section}>
          <SectionInner wide={true} className={s.container}>
            <div className={s.content}>
              <h3>Sei dabei!</h3>
              {date && location ? (
                <p>
                  Du willst an der Sammlung oder dem Event am{' '}
                  {formatDate(new Date(date))} in {location} teilnehmen?
                </p>
              ) : (
                <p>Du willst uns bei der Sammlung unterstützen?</p>
              )}

              <SignUp
                fieldsToRender={[
                  'email',
                  'username',
                  'phoneNumber',
                  'zipCode',
                  'question',
                ]}
                overwriteMandatoryFields={['username']}
                fieldsToHideIfValueExists={['phoneNumber', 'zipCode']}
                // If this is a signup for a specific collection (date and location set), that should be saved.
                // Otherwise we pass that user wants to collect in general
                additionalData={{
                  wantsToCollect:
                    date && location
                      ? { meetup: { date, location } }
                      : { inGeneral: true },
                }}
                postSignupAction={() => navigate('/sammeln/bild-hochladen')}
                showHeading={false}
              />
            </div>
          </SectionInner>
        </Section>
      </SectionWrapper>
    </Layout>
  );
};

export default CollectorSignUpPage;
