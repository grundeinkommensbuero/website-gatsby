import React from 'react';
import s from './style.module.less';
import Link from 'gatsby-link';
import Logo from './logo.svg';

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
                <li key={index} className={s.navItem}>
                  <Link
                    className={s.link}
                    activeClassName={s.linkActive}
                    to={item.slug === '/' ? '/' : `/${item.slug}/`}
                  >
                    {item.shortTitle || item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
