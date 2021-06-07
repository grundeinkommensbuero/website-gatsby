import React from 'react';
import { contentfulJsonToHtml } from '../../../utils/contentfulJsonToHtml';
import { GatsbyImage } from 'gatsby-plugin-image';
import * as s from './style.module.less';
import cN from 'classnames';

export const TextAndImage = ({ layout, text, image }) => {
  return (
    <div
      className={cN(s.container, { [s.imageRight]: layout === 'ImageRight' })}
    >
      {image && image.gatsbyImageData && (
        <GatsbyImage image={image.gatsbyImageData} className={s.image} alt="" />
      )}
      {text && <div className={s.text}>{contentfulJsonToHtml(text)}</div>}
    </div>
  );
};
