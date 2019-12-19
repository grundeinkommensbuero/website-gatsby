import React from 'react';
import s from './style.module.less';
import Link from 'gatsby-link';
import Logo from './logo.svg';
import cN from 'classnames';

const Header = ({ menu }) => {
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
        {menu && (
          <nav className={s.nav}>
            <ul className={s.navList}>
              {menu.map((item, index) => (
                <>
                  {item.__typename === 'ContentfulStaticContent' ? (
                    <MenuItem key={index} {...item} />
                  ) : (
                    <MenuItemParent key={index} {...item} />
                  )}
                </>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

const MenuItemParent = ({ title, contentfulchildren }) => {
  const children = contentfulchildren;
  return (
    <li className={cN(s.navItem, s.navItemParent)}>
      <div className={s.menuItemParentTitle}>{title}</div>
      <ul className={s.menuItemParentChildren}>
        {children.map((item, index) => (
          <MenuItem key={index} child={true} {...item} />
        ))}
      </ul>
    </li>
  );
};

const MenuItem = ({ slug, shortTitle, title, child }) => (
  <li className={cN(s.navItem, { [s.navItemChild]: child })}>
    {console.log('huhu', slug)}
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
