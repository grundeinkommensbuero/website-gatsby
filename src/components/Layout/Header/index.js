import React, { useState } from 'react';
import s from './style.module.less';
import Link from 'gatsby-link';
import Logo from './logo.svg';
import cN from 'classnames';
import { OverlayContext } from '../../../context/Overlay';
import { Button } from '../../Forms/Button';
// import { Tooltip } from '../../Tooltip';

const Header = ({ menu, hasOverlay }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className={s.header}>
      <div className={s.inner}>
        <h1 className={s.title}>
          <Link to="/">
            <img
              src={Logo}
              className={s.logo}
              alt="Expedition Grundeinkommen Home"
            />
          </Link>
        </h1>
        {/* <Tooltip
          content={
            <>
              Wir stellen unsere Kampagne wegen Corona auf Briefversand um.
              Beteilige dich jetzt am Crowdfunding, um die Kosten zu decken!
            </>
          }
          className={s.ctaButtonWrapper}
        > */}
        {hasOverlay && (
          <OverlayContext.Consumer>
            {({ toggleOverlay }) => (
              <Button
                className={s.ctaButton}
                size="MEDIUM"
                onClick={() => toggleOverlay()}
              >
                Jetzt abstimmen
              </Button>
            )}
          </OverlayContext.Consumer>
        )}
        {/* </Tooltip> */}
        {menu && (
          <nav className={s.nav}>
            <button
              className={s.menuButton}
              onClick={() => toggleMenu()}
              aria-label="Hauptmenü"
              aria-expanded={menuOpen}
              aria-controls="menuHeader"
            >
              <div className={s.menuButtonBars}>
                <div className={s.menuButtonBar} />
                <div className={s.menuButtonBar} />
                <div className={s.menuButtonBar} />
              </div>
            </button>
            <Menu menu={menu} menuOpen={menuOpen} />
          </nav>
        )}
      </div>
    </header>
  );
};

const Menu = ({ menu, menuOpen }) => {
  return (
    <ul className={cN(s.navList, { [s.isOpen]: menuOpen })} id="menuHeader">
      {menu.map((item, index) => {
        if (item.__typename === 'ContentfulStaticContent') {
          return <MenuItem key={index} {...item} />;
        } else {
          return <MenuItemParent key={index} {...item} />;
        }
      })}
    </ul>
  );
};

const MenuItemParent = ({
  title,
  contentfulchildren,
  internalLink,
  externalLink,
}) => {
  const children = contentfulchildren;
  return (
    <li className={cN(s.navItem, s.navItemParent)}>
      {!internalLink && !externalLink && (
        <div className={s.menuItemParentTitle}>{title}</div>
      )}
      {internalLink && (
        <Link
          className={s.link}
          activeClassName={s.linkActive}
          to={internalLink}
        >
          {title}
        </Link>
      )}
      {externalLink && (
        <a className={s.link} href={externalLink} target="_blank">
          {title}
        </a>
      )}
      {children && (
        <div className={s.menuItemParentChildren}>
          <ul className={s.menuItemParentChildrenInner}>
            {children.map((item, index) => (
              <MenuItem key={index} child={true} {...item} />
            ))}
          </ul>
        </div>
      )}
    </li>
  );
};

const MenuItem = ({ slug, shortTitle, title, child }) => (
  <li className={cN(s.navItem, { [s.navItemChild]: child })}>
    <Link
      className={s.link}
      activeClassName={s.linkActive}
      to={slug === '/' ? '/' : `/${slug}/`}
    >
      {shortTitle || title}
    </Link>
  </li>
);

export default Header;
