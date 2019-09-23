import React from 'react';
import s from './style.module.less';
import cN from 'classnames';

const AboutUs = ({ members, className }) => {
  return (
    <ul className={cN(s.aboutUs, className)}>
      {members.map((member, index) => {
        const { name, image } = member;
        return (
          <li key={index} className={s.member}>
            {image && (
              <div className={s.imageContainer}>
                <img
                  src={image.fluid.src}
                  srcSet={image.fluid.srcSet}
                  className={s.image}
                />
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
