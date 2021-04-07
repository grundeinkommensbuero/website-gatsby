import React from 'react';
import { contentfulJsonToHtml } from '../../../utils/contentfulJsonToHtml';
import Img from 'gatsby-image';
import s from './style.module.less';

export const TextAndImage = ({ text, image }) => {
  return (
    <div className={s.container}>
      {image && image.fluid && <Img className={s.image} fluid={image.fluid} />}
      {text && <div className={s.text}>{contentfulJsonToHtml(text.json)}</div>}
    </div>
  );
};
