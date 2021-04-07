import React from 'react';
import { contentfulJsonToHtml } from '../../../utils/contentfulJsonToHtml';
import Img from 'gatsby-image';
import s from './style.module.less';
import cN from 'classnames';

export const TextAndImage = ({ layout, text, image }) => {
  return (
    <div
      className={cN(s.container, { [s.imageRight]: layout === 'ImageRight' })}
    >
      {image && image.fluid && <Img className={s.image} fluid={image.fluid} />}
      {text && <div className={s.text}>{contentfulJsonToHtml(text.json)}</div>}
    </div>
  );
};
