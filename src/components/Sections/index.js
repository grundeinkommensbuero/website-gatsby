import React from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import s from './style.module.less';
import cN from 'classnames';
import EmailListForm from '../EmailListForm';
import { stringToId } from '../utils';
import MainIllustration from '../MainIllustration';

export default function Sections({ sections }) {
  if (sections && sections.length) {
    return (
      <div className={s.sections}>
        {sections.map((section, index) => {
          const { title, titleShort, body, emailSignup } = section;
          const id = stringToId(titleShort);
          return (
            <section key={index} className={s.section}>
              <div id={id} className={s.jumpToAnchor} />
              <div className={s.sectionBody}>
                {title && <h1 className={s.title}>{title}</h1>}
                {body && (
                  <>
                    {documentToReactComponents(
                      body.json,
                      documentToREactComponentsOptions
                    )}
                  </>
                )}
                {emailSignup && <EmailListForm />}
                {section.videoLink && <YoutubeEmbed url={section.videoLink} />}
              </div>
              {section.videoLink && (
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

function YoutubeEmbed({ url }) {
  return (
    <iframe
      width="560"
      height="315"
      src={`https://www.youtube.com/embed/${url}`}
      frameBorder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  );
}

// needed so that line breaks are properly added.
const documentToREactComponentsOptions = {
  renderText: text => {
    return text.split('\n').reduce((children, textSegment, index) => {
      return [...children, index > 0 && <br key={index} />, textSegment];
    }, []);
  },
};
