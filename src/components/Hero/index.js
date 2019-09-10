import React from 'react';
import Img from 'gatsby-image';

import style from './style.module.css';

export default ({ data }) => (
  <div className={style.hero}>
    <Img
      className={style.heroImage}
      alt={data.name}
      fluid={data.heroImage.fluid}
    />
    <div className={style.heroDetails}>
      <h3 className={style.heroHeadline}>{data.title}</h3>
    </div>
  </div>
);
