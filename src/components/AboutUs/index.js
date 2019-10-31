import React from 'react';
import s from './style.module.less';
import cN from 'classnames';
import Img from 'gatsby-image';

const AboutUs = ({ members, className }) => {
  return (
    <ul className={cN(s.aboutUs, className)}>
      {members.map((member, index) => {
        const { name, image } = member;
        return (
          <li key={index} className={s.member}>
            {image && (
              <div className={s.imageContainer}>
                <Img fluid={image.fluid} className={s.image} loading="lazy" />
              </div>
            )}
            <span>{name}</span>
          </li>
        );
      })}
    </ul>
  );
};

export default AboutUs;
