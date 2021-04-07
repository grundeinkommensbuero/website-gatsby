import React from 'react';
import { contentfulJsonToHtml } from '../../../utils/contentfulJsonToHtml';
import Img from 'gatsby-image';

export const SectionComponentTextAndImage = ({ text, image }) => {
  return (
    <>
      {image && image.fluid && <Img fluid={image.fluid} />}
      {text && <div>{contentfulJsonToHtml(text.json)}</div>}
    </>
  );
};
