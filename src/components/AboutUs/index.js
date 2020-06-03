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
      {members.map(
        ({ name, image, role, twitter, linkedin, website }, index) => {
          const links = [
            { link: twitter, icon: 'twitter' },
            { link: linkedin, icon: 'linkedin' },
            { link: website, icon: 'website' },
          ].filter(link => {
            return !!link.link;
          });

          return (
            <li key={index} className={s.member}>
              {image && (
                <div className={s.imageContainer}>
                  <Img fluid={image.fluid} className={s.image} loading="lazy" />
                  {!!links.length && (
                    <div className={s.socialMediaButtons}>
                      {links.map(link => (
                        <SocialMediaButton
                          key={link.icon}
                          name={name}
                          {...link}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}
              <div className={s.label}>
                <div dangerouslySetInnerHTML={{ __html: name }} />
                {role && <div className={s.role}>{role}</div>}
              </div>
            </li>
          );
        }
      )}
    </ul>
  );
};

const SocialMediaButton = ({ icon, link, name }) => {
  if (!link) {
    return null;
  }

  let title;

  if (icon === 'twitter') {
    title = `${name} bei Twitter`;
  } else if (icon === 'linkedin') {
    title = `${name} bei LinkedIn`;
  } else {
    title = `${name} im Internet`;
  }

  return (
    <>
      <a
        href={link}
        aria-label={title}
        dangerouslySetInnerHTML={{ __html: ICONS[icon] }}
        className={s.socialMediaButton}
        target="_blank"
        rel="noopener noreferrer"
        title={title}
      />{' '}
    </>
  );
};

export default AboutUs;
