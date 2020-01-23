import React from 'react';
import s from './style.module.less';
import cN from 'classnames';
import Img from 'gatsby-image';

const ICONS = {
  twitter: require('!svg-inline-loader!./icons/twitter-brands.svg'),
  linkedin: require('!svg-inline-loader!./icons/linkedin-brands.svg'),
  website: require('!svg-inline-loader!./icons/globe-europe-solid.svg'),
};

const AboutUs = ({ members, className }) => {
  return (
    <ul className={cN(s.aboutUs, className)}>
      {members.map((member, index) => {
        const { name, image } = member;
        const links = [
          { link: member.twitter, icon: 'twitter' },
          { link: member.linkedin, icon: 'linkedin' },
          { link: member.website, icon: 'website' },
        ];

        return (
          <li key={index} className={s.member}>
            {image && (
              <div className={s.imageContainer}>
                <Img fluid={image.fluid} className={s.image} loading="lazy" />
              </div>
            )}
            <span>
              {name}{' '}
              {links.map(link => (
                <SocialMediaButton {...link} />
              ))}
            </span>
          </li>
        );
      })}
    </ul>
  );
};

const SocialMediaButton = ({ icon, link }) => {
  if (!link) {
    return null;
  }

  return (
    <>
      <a
        href={link}
        aria-label={icon}
        dangerouslySetInnerHTML={{ __html: ICONS[icon] }}
      ></a>{' '}
    </>
  );
};

export default AboutUs;
