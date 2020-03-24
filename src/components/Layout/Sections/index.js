import React from 'react';
import s from './style.module.less';
import cN from 'classnames';
import CampaignVisualisations from '../../CampaignVisualisations';
import Map from '../../Map';
import EmailListForm from '../../EmailListForm';
import { stringToId, contentfulJsonToHtml } from '../../utils';
import MainIllustration from '../../MainIllustration';
import AboutUs from '../../AboutUs';
import Pledge from '../../Forms/Pledge';
import Signatures from '../../Forms/Signatures';
import { CTAButtonContainer, CTALinkExternal, CTALink } from '../CTAButton';
import TwitterEmbed from '../../TwitterEmbed';
import HeaderBackgrounds from '../HeaderBackgrounds';
import Img from 'gatsby-image';
import Share from '../../SocialMedia/Share';
import BlogTeaser from '../../BlogTeaser';
import QuestionUbi from '../../QuestionUbi';
import Confetti from '../../Confetti';

export default function Sections({ sections }) {
  if (sections && sections.length) {
    return (
      <SectionWrapper>
        {sections.map((section, index) => {
          const {
            title,
            titleShort,
            campainVisualisations,
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
            map,
            backgroundIllustration,
            socialMediaButtons,
            blogTeaser,
            preTitle,
            subTitle,
            backgroundImage,
            questionUbi,
            bodyAtTheEnd,
          } = section;
          const id = stringToId(titleShort);
          const isVideoSection = __typename === 'ContentfulPageSectionVideo';
          const isIllustration =
            __typename === 'ContentfulPageSectionIllustration';

          if (__typename === 'ContentfulPageSectionIntro') {
            return (
              <SectionHeader
                key={index}
                backgroundImageSet={backgroundImage && backgroundImage.fluid}
                title={title}
                preTitle={preTitle}
                subTitle={subTitle}
              ></SectionHeader>
            );
          }

          return (
            <Section
              key={index}
              title={title}
              jumpToId={id}
              isVideoSection={isVideoSection}
              afterBodyContent={
                <>
                  {(isIllustration || isVideoSection) && (
                    <MainIllustration className={s.illustration} />
                  )}
                  {backgroundIllustration === 'confetti' && <Confetti />}
                </>
              }
              className={cN({
                [s.sectionPledge]: !!pledgeId,
                [s.sectionNewsletter]: !!emailSignup,
                [s.sectionIllustration]: isIllustration,
                [s.sectionVideo]: isVideoSection,
                [s.sectionCrowdCollect]:
                  backgroundIllustration === 'crowd_collect',
                [s.sectionCrowdTravel]:
                  backgroundIllustration === 'crowd_travel',
                [s.sectionConfetti]: backgroundIllustration === 'confetti',
              })}
              sectionBodyNoEvents={isIllustration || isVideoSection}
            >
              {isIllustration && (
                <Slogan sloganLine1={sloganLine1} sloganLine2={sloganLine2} />
              )}
              {(body || pledgeId || signaturesId) && (
                <SectionInner hugeText={bodyTextSizeHuge}>
                  {body && body.json ? contentfulJsonToHtml(body.json) : body}
                  {pledgeId && (
                    <Pledge pledgeId={pledgeId} className={s.pledge} />
                  )}
                  {signaturesId && (
                    <Signatures
                      signaturesId={signaturesId}
                      className={s.pledge}
                    />
                  )}
                </SectionInner>
              )}
              {campainVisualisations && (
                <CampaignVisualisations
                  visualisations={campainVisualisations}
                />
              )}
              {map && <Map state={map} />}
              {emailSignup && (
                <SectionInner>
                  <EmailListForm className={s.emailSignup} />
                </SectionInner>
              )}
              {videoLink && <YoutubeEmbed url={videoLink} />}
              {teamMembers && (
                <SectionInner wide={true}>
                  <AboutUs members={teamMembers} />
                </SectionInner>
              )}
              {callToActionReference && (
                <SectionInner>
                  <CTAButtonContainer>
                    {callToActionReference.map(
                      ({ title, shortTitle, slug }, index) => (
                        <CTALink key={index} to={`/${slug}/`}>
                          {shortTitle || title}
                        </CTALink>
                      )
                    )}
                  </CTAButtonContainer>
                </SectionInner>
              )}
              {blogTeaser && <BlogTeaser />}
              {blogTeaser && callToActionText && callToActionLink && (
                <div className={s.spaceBetweenBlogAndCTA} />
              )}
              {questionUbi && <QuestionUbi mode={questionUbi} />}
              {callToActionText && callToActionLink && (
                <SectionInner>
                  <CTAButtonContainer>
                    <CTALinkExternal href={callToActionLink}>
                      {callToActionText}
                    </CTALinkExternal>
                  </CTAButtonContainer>
                </SectionInner>
              )}
              {twitterFeed && (
                <SectionInner>
                  <TwitterEmbed />
                </SectionInner>
              )}
              {socialMediaButtons && (
                <SectionInner>
                  <Share />
                </SectionInner>
              )}
              {bodyAtTheEnd && bodyAtTheEnd.json && (
                <SectionInner hugeText={bodyTextSizeHuge}>
                  {contentfulJsonToHtml(bodyAtTheEnd.json)}
                </SectionInner>
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
  afterBodyContent,
  isHeader,
  sectionBodyNoEvents,
}) {
  return (
    <section
      className={cN(s.section, className, {
        [s.sectionHeader]: isHeader,
      })}
    >
      {jumpToId && <div id={jumpToId} className={s.jumpToAnchor} />}
      <div
        className={cN(s.sectionBody, {
          [s.sectionBodyNoEvents]: sectionBodyNoEvents,
        })}
      >
        {title && <h1 className={s.title}>{title}</h1>}
        {children}
      </div>
      {afterBodyContent}
    </section>
  );
}

export function SectionHeader({
  backgroundImageSet,
  className,
  title,
  preTitle,
  subTitle,
  ...other
}) {
  return (
    <Section
      isHeader={true}
      afterBodyContent={
        backgroundImageSet ? (
          <>
            <Img className={s.heroImage} fluid={backgroundImageSet} />
            <div className={s.heroImageOverlay} />
          </>
        ) : (
          <HeaderBackgrounds />
        )
      }
      className={cN(className, {
        [s.sectionWithHeroImage]: backgroundImageSet,
      })}
      {...other}
    >
      <SectionInner>
        <header className={s.header}>
          <div className={s.headerText}>
            {preTitle && <div className={s.headerPreTitle}>{preTitle}</div>}
            <h1 className={s.headerTitle}>{title}</h1>
            {subTitle && <div className={s.headerSubTitle}>{subTitle}</div>}
          </div>
        </header>
      </SectionInner>
    </Section>
  );
}

export function SectionInner({ children, hugeText, wide, className }) {
  return (
    <div
      className={cN(s.inner, className, {
        [s.innerTextHuge]: hugeText,
        [s.innerWide]: wide,
      })}
    >
      {children}
    </div>
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
