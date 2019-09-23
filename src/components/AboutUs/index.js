import React from 'react';
import s from './style.module.less';

const AboutUs = ({ members }) => {
  return (
    <ul className={s.aboutUs}>
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
