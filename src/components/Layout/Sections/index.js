import React from 'react';
import s from './style.module.less';
import cN from 'classnames';
import CampaignVisualisations from '../../CampaignVisualisations';
import Maps from '../../Maps';
import SignUp from '../../Forms/SignUp';
import EmailListForm from '../../EmailListForm';
import { stringToId } from '../../utils';
import MainIllustration from '../../MainIllustration';
import AboutUs from '../../AboutUs';
import Pledge from '../../Forms/Pledge';
import SignatureListDownload from '../../Forms/SignatureListDownload';
import { CTAButtonContainer, CTALinkExternal, CTALink } from '../CTAButton';
import TwitterEmbed from '../../TwitterEmbed';
import HeaderBackgrounds from '../HeaderBackgrounds';
import Img from 'gatsby-image';
import Share from '../../SocialMedia/Share';
import BlogTeaser from '../../BlogTeaser';
import QuestionUbi from '../../QuestionUbi';
import Confetti from '../../Confetti';
import DonationForm from '../../Forms/DonationForm';
import { contentfulJsonToHtml } from '../../utils/contentfulJsonToHtml';
import { MunicipalityIntro } from '../../Municipality/MunicipalityIntro';
import { useUserMunicipalityContentfulState } from '../../../hooks/Municipality/UserMunicipalityContentfulState';
import { getFilteredElementsByContentfulState } from '../../utils';
import { TickerToSignup } from '../../TickerToSignup';
import { MunicipalityMap } from '../../Municipality/MunicipalityMap';

const Components = {
  TickerToSignup,
  MunicipalityMap,
};

export default function Sections({ sections, pageContext }) {
  if (sections && sections.length) {
    return (
      <SectionWrapper>
        {sections.map((section, index) => (
          <ContentfulSection
            section={section}
            pageContext={pageContext}
            key={index}
          />
        ))}
      </SectionWrapper>
    );
  }
  return null;
}

export function SectionWrapper({ children, className }) {
  return <div className={cN(s.sections, className)}>{children}</div>;
}

export function ContentfulSection({ section, pageContext }) {
  const {
    title,
    titleShort,
    campainVisualisations,
    body,
    signUpForm,
    emailSignup,
    videoLink,
    callToActionLink,
    callToActionText,
    sloganLine1,
    sloganLine2,
    __typename,
    teamMembers,
    colorScheme = 'white',
    bodyTextSizeHuge,
    pledgeId,
    signaturesId,
    disableRequestListsByMail,
    callToActionReference,
    twitterFeed,
    maps,
    backgroundIllustration,
    socialMediaButtons,
    blogTeaser,
    preTitle,
    subTitle,
    backgroundImage,
    questionUbi,
    bodyAtTheEnd,
    columnIntroText,
    imageTopLeft,
    imageTopRight,
    imageBottomLeft,
    imageBottomRight,
    columnTopLeft,
    columnTopRight,
    columnBottomLeft,
    columnBottomRight,
    introText,
    theme,
  } = section;

  const id = stringToId(titleShort);
  const isVideoSection = __typename === 'ContentfulPageSectionVideo';
  const isIllustration = __typename === 'ContentfulPageSectionIllustration';
  const isTwoColumns = __typename === 'ContentfulPageSectionTwoColumns';
  const isDonationFeature = __typename === 'ContentfulPageSectionDonation';
  const isChristmasDonationTheme = theme === 'christmas';

  const {
    municipalityContentfulState,
    userContentfulState,
  } = useUserMunicipalityContentfulState();

  if (__typename === 'ContentfulPageSectionWithComponents') {
    const filteredComponents = getFilteredElementsByContentfulState({
      elements: section.components,
      municipalityContentfulState,
      userContentfulState,
    });
    const getComponentFromContentful = component => {
      const componentSelector = component.__typename.replace(
        'ContentfulSectionComponent',
        ''
      );
      if (typeof Components[componentSelector] !== 'undefined') {
        return React.createElement(Components[componentSelector], {
          ...component,
        });
      } else {
        return (
          <div>The component {componentSelector} has not been created yet.</div>
        );
      }
    };
    // TODO: Better CSS Class names
    return (
      <>
        {section.keyVisual && <div className={s.keyVisual}>{''}</div>}
        <Section className={s.componentWrapper}>
          <SectionInner className={s.componentElementContainer}>
            {filteredComponents.map(component => {
              return (
                <div className={s.componentElement}>
                  {getComponentFromContentful(component)}
                </div>
              )
            })}
          </SectionInner>
        </Section>
      </>
    );
  }

  if (__typename === 'ContentfulPageSectionGemeindeIntro') {
    return (
      <MunicipalityIntro
        pageContext={pageContext}
        className={s.sectionGemeindeIntro}
        title={title}
        body={body?.body}
      />
    );
  }

  if (__typename === 'ContentfulPageSectionIntro') {
    return (
      <SectionHeader
        backgroundImageSet={backgroundImage && backgroundImage.fluid}
        title={title}
        preTitle={preTitle}
        subTitle={subTitle}
      ></SectionHeader>
    );
  }

  return (
    <Section
      title={title}
      jumpToId={id}
      isVideoSection={isVideoSection}
      afterBodyContent={
        <>
          {isIllustration && <MainIllustration className={s.illustration} />}
          {backgroundIllustration === 'confetti' && <Confetti />}
        </>
      }
      className={cN({
        [s.sectionPledge]: !!pledgeId,
        [s.sectionNewsletter]: !!emailSignup,
        [s.sectionIllustration]: isIllustration,
        [s.sectionVideo]: isVideoSection,
        [s.sectionTwoColumns]: isTwoColumns,
        [s.sectionCrowdCollect]: backgroundIllustration === 'crowd_collect',
        [s.sectionCrowdTravel]: backgroundIllustration === 'crowd_travel',
        [s.sectionCrowdQuestion]: backgroundIllustration === 'crowd_question',
        [s.sectionConfetti]: backgroundIllustration === 'confetti',
        [s.sectionWhite]: colorScheme === 'white',
        [s.sectionPink]: colorScheme === 'pink',
        [s.sectionGreen]: colorScheme === 'green',
        [s.sectionRed]: colorScheme === 'red',
        [s.sectionChristmas]: colorScheme === 'christmas',
        [s.sectionChristmasDonation]: isChristmasDonationTheme,
      })}
      sectionBodyNoEvents={isIllustration || isVideoSection}
    >
      {/* {theme === 'christmas' && <Confetti componentTheme="christmas" />}
      {colorScheme === 'christmas' && <Confetti componentTheme="christmas" />}
      {isVideoSection && <Confetti componentTheme="christmas" />} */}

      {isIllustration && (
        <Slogan sloganLine1={sloganLine1} sloganLine2={sloganLine2} />
      )}
      {isTwoColumns && (
        <SectionInner>
          <div className={s.columnIntroText}>
            {contentfulJsonToHtml(columnIntroText.json)}
          </div>
          <TwoColumns className={s.columnWrapper}>
            <section className={s.column}>
              {imageTopLeft && (
                <div className={s.columnIconWrapper}>
                  <Img className={s.columnIcon} fixed={imageTopLeft.fixed} />
                </div>
              )}
              <div className={s.columnIcon}>
                {contentfulJsonToHtml(columnTopLeft.json)}
              </div>
            </section>
            <section className={s.column}>
              {imageTopRight && (
                <div className={s.columnIconWrapper}>
                  <Img className={s.columnIcon} fixed={imageTopRight.fixed} />
                </div>
              )}
              <div>{contentfulJsonToHtml(columnTopRight.json)}</div>
            </section>
            <section className={s.column}>
              {imageBottomLeft && (
                <div className={s.columnIconWrapper}>
                  <Img className={s.columnIcon} fixed={imageBottomLeft.fixed} />
                </div>
              )}
              <div className={s.columnIcon}>
                {contentfulJsonToHtml(columnBottomLeft.json)}
              </div>
            </section>
            <section className={s.column}>
              {imageBottomRight && (
                <div className={s.columnIconWrapper}>
                  <Img
                    className={s.columnIcon}
                    fixed={imageBottomRight.fixed}
                  />
                </div>
              )}
              <div>{contentfulJsonToHtml(columnBottomRight.json)}</div>
            </section>
          </TwoColumns>
        </SectionInner>
      )}
      {isDonationFeature && (
        <SectionInner>
          {introText && <div className={s.donationIntroText}>{introText}</div>}
          <DonationForm theme={theme}></DonationForm>
        </SectionInner>
      )}
      {(body || pledgeId || signaturesId) && (
        <SectionInner hugeText={bodyTextSizeHuge}>
          {body && body.json ? contentfulJsonToHtml(body.json) : body}
          {pledgeId && <Pledge pledgeId={pledgeId} className={s.pledge} />}
          {signaturesId && (
            <SignatureListDownload
              signaturesId={signaturesId}
              disableRequestListsByMail={disableRequestListsByMail}
              className={s.pledge}
            />
          )}
        </SectionInner>
      )}
      {campainVisualisations && (
        <CampaignVisualisations visualisations={campainVisualisations} />
      )}
      {maps && <Maps config={maps} />}
      {signUpForm && (
        <SectionInner>
          <SignUp />
        </SectionInner>
      )}
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
            {callToActionReference.map(({ title, shortTitle, slug }, index) => (
              <CTALink key={index} to={`/${slug}/`}>
                {shortTitle || title}
              </CTALink>
            ))}
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
      {jumpToId && (
        <div id={jumpToId} className={s.jumpToAnchor}>
          <div id={jumpToId.toLowerCase()} />
        </div>
      )}
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

export function TwoColumns({ children, className }) {
  return <div className={cN(s.inner, className)}>{children}</div>;
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
        title="Youtube Embed"
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
