import React, { useState } from 'react';
import s from './style.module.less';
import Link from 'gatsby-link';
import Logo from './logo.svg';
import cN from 'classnames';

const Header = ({ menu }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    console.log('click', menuOpen);
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
        {menu && (
          <nav className={s.nav}>
            <button
              className={s.menuButton}
              onClick={() => toggleMenu()}
              aria-label="menu"
              aria-expanded={menuOpen}
              aria-controls="menuHeader"
            >
              Menu
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
