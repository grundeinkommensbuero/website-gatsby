import { GatsbyImage } from 'gatsby-plugin-image';
import React from 'react';
import { Section } from '..';
import * as s from './style.module.less';
import * as gS from '../style.module.less';
import cN from 'classnames';

const FullscreenHero = ({ heroImage, title, subTitle }) => {
  return (
    <Section className={gS.sectionFullscreenHero}>
      <GatsbyImage
        image={heroImage.gatsbyImageData}
        alt="Bild der Expedition Grundeinkommen"
      />
      <h1 className={cN(s.title, s.titles)}>{title}</h1>
      <h3 className={cN(s.subTitle, s.titles)}>{subTitle}</h3>
    </Section>
  );
};

export default FullscreenHero;
