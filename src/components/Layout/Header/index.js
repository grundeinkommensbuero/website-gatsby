import React from 'react';
import s from './style.module.less';
import { Link } from 'gatsby';
import { stringToId } from '../../utils';
import Logo from './logo.svg';

const Header = ({ sections }) => {
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
        {sections && (
          <nav className={s.nav}>
            <ul className={s.navList}>
              {sections.map(section => {
                const id = stringToId(section.titleShort);

                if (id) {
                  return (
                    <li key={id} className={s.navItem}>
                      <a className={s.link} href={`#${id}`}>
                        {section.titleShort}
                      </a>
                    </li>
                  );
                }
              })}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
