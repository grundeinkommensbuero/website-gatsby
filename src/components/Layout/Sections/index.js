import React from 'react';
import s from './style.module.less';
import cN from 'classnames';
import EmailListForm from '../../EmailListForm';
import { stringToId, contentfulJsonToHtml } from '../../utils';
import MainIllustration from '../../MainIllustration';
import AboutUs from '../../AboutUs';
import { LinkButton } from '../../Forms/Button';
import Pledge from '../../Forms/Pledge';
import CTAButton from '../CTAButton';

export default function Sections({ sections }) {
  if (sections && sections.length) {
    return (
      <div className={s.sections}>
        {sections.map((section, index) => {
          const {
            title,
            titleShort,
            body,
            emailSignup,
            videoLink,
            callToActionLink,
            callToActionText,
            sloganLine1,
            sloganLine2,
            __typename,
            teamMembers,
            bodyTextSizeHuge,
            pledge,
          } = section;

          const id = stringToId(titleShort);
          return (
            <section
              key={index}
              className={cN(s.section, {
                [s.sectionVideo]: __typename === 'ContentfulPageSectionVideo',
                [s.sectionNewsletter]: emailSignup,
                [s.sectionPledge]: pledge,
              })}
            >
              <div id={id} className={s.jumpToAnchor} />
              <div
                className={cN(s.sectionBody, {
                  [s.sectionBodyNoEvents]:
                    __typename === 'ContentfulPageSectionIllustration' ||
                    __typename === 'ContentfulPageSectionVideo',
                })}
              >
                {title && <h1 className={s.title}>{title}</h1>}
                {__typename === 'ContentfulPageSectionIllustration' && (
                  <Slogan sloganLine1={sloganLine1} sloganLine2={sloganLine2} />
                )}
                {body && (
                  <div
                    className={cN(s.bodyText, {
                      [s.bodyTextHuge]: bodyTextSizeHuge,
                    })}
                  >
                    {body.json ? contentfulJsonToHtml(body.json) : body}
                    {pledge && <Pledge className={s.pledge} />}
                  </div>
                )}
                {emailSignup && <EmailListForm className={s.emailSignup} />}
                {videoLink && <YoutubeEmbed url={videoLink} />}
                {teamMembers && (
                  <AboutUs className={s.aboutUs} members={teamMembers} />
                )}
                {callToActionText && callToActionLink && (
                  <CTAButton
                    className={s.callToActionContainer}
                    href={callToActionLink}
                  >
                    {callToActionText}
                  </CTAButton>
                )}
              </div>
              {(__typename === 'ContentfulPageSectionIllustration' ||
                __typename === 'ContentfulPageSectionVideo') && (
                <MainIllustration className={s.illustration} />
              )}
            </section>
          );
        })}
      </div>
    );
  }
  return null;
}

function Slogan({ sloganLine1, sloganLine2 }) {
  return (
    <h1 className={s.slogan}>
      <span className={s.sloganLine1}>{sloganLine1}</span>
      <span className={s.sloganLine2}>{sloganLine2}</span>
      {/* <EmailListForm className={s.sloganLineSignup} /> */}
    </h1>
  );
}

function YoutubeEmbed({ url }) {
  return (
    <div className={s.youtubeContainer}>
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube-nocookie.com/embed/${url}?rel=0`}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}
