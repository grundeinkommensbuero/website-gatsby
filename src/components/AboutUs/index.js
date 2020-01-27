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
        ].filter(link => {
          return !!link.link;
        });
        const nameWithLineBreak = name.replace(' ', '<br />');

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
            <div>
              <span dangerouslySetInnerHTML={{ __html: nameWithLineBreak }} />
            </div>
          </li>
        );
      })}
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
        title={title}
      />{' '}
    </>
  );
};

export default AboutUs;
