import React from 'react';
import s from './style.module.less';
import cN from 'classnames';
import EmailListForm from '../../EmailListForm';
import { stringToId, contentfulJsonToHtml } from '../../utils';
import MainIllustration from '../../MainIllustration';
import AboutUs from '../../AboutUs';
import Pledge from '../../Forms/Pledge';
import Signatures from '../../Forms/Signatures';
import { CTAButtonContainer, CTALinkExternal, CTALink } from '../CTAButton';
import TwitterEmbed from '../../TwitterEmbed';

export default function Sections({ sections }) {
  if (sections && sections.length) {
    return (
      <SectionWrapper>
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
            pledgeId,
            signaturesId,
            callToActionReference,
            twitterFeed,
          } = section;

          const id = stringToId(titleShort);
          return (
            <Section
              key={index}
              title={title}
              jumpToId={id}
              isVideoSection={__typename === 'ContentfulPageSectionVideo'}
              isIllustrationSection={
                __typename === 'ContentfulPageSectionIllustration'
              }
              isNewsletter={!!emailSignup}
              isPledge={!!pledgeId}
              afterBodyContent={
                (__typename === 'ContentfulPageSectionIllustration' ||
                  __typename === 'ContentfulPageSectionVideo') && (
                  <MainIllustration className={s.illustration} />
                )
              }
            >
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
                  {pledgeId && (
                    <Pledge pledgeId={pledgeId} className={s.pledge} />
                  )}
                  {signaturesId && (
                    <Signatures
                      signaturesId={signaturesId}
                      className={s.pledge}
                    />
                  )}
                </div>
              )}
              {emailSignup && <EmailListForm className={s.emailSignup} />}
              {videoLink && <YoutubeEmbed url={videoLink} />}
              {teamMembers && (
                <AboutUs className={s.aboutUs} members={teamMembers} />
              )}
              {callToActionReference && (
                <CTAButtonContainer className={s.callToActionContainer}>
                  {callToActionReference.map(
                    ({ title, shortTitle, slug }, index) => (
                      <CTALink key={index} to={`/${slug}/`}>
                        {shortTitle || title}
                      </CTALink>
                    )
                  )}
                </CTAButtonContainer>
              )}
              {callToActionText && callToActionLink && (
                <CTAButtonContainer className={s.callToActionContainer}>
                  <CTALinkExternal href={callToActionLink}>
                    {callToActionText}
                  </CTALinkExternal>
                </CTAButtonContainer>
              )}

              {twitterFeed && (
                <div className={s.tweetContainer}>
                  <TwitterEmbed />
                </div>
              )}
            </Section>
          );
        })}
      </SectionWrapper>
    );
  }
  return null;
}

export function SectionWrapper({ children, className }) {
  return <div className={cN(s.sections, className)}>{children}</div>;
}

export function Section({
  children,
  className,
  title,
  jumpToId,
  isVideoSection,
  isIllustrationSection,
  isNewsletter,
  isPledge,
  afterBodyContent,
}) {
  return (
    <section
      className={cN(s.section, className, {
        [s.sectionVideo]: isVideoSection,
        [s.sectionIllustration]: isIllustrationSection,
        [s.sectionNewsletter]: isNewsletter,
        [s.sectionPledge]: isPledge,
      })}
    >
      {jumpToId && <div id={jumpToId} className={s.jumpToAnchor} />}
      <div
        className={cN(s.sectionBody, {
          [s.sectionBodyNoEvents]: isIllustrationSection || isVideoSection,
        })}
      >
        {title && <h1 className={s.title}>{title}</h1>}
        {children}
      </div>
      {afterBodyContent}
    </section>
  );
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
