import React, { useState } from 'react';
import Link from 'gatsby-link';

// import { OverlayContext } from '../../../context/Overlay';
// import { Button } from '../../Forms/Button';

import * as s from './style.module.less';
import Logo from './logo.svg';
import LogoBerlin from './logo-berlin.svg';
import BurgerMenu from './icon-burgermenu.svg';
import CloseMenu from './icon-close-menu.svg';
import Menu from './Menu';
// import { StickyDonationBar } from './StickyDonationBar';

const IS_BERLIN_PROJECT = process.env.GATSBY_PROJECT === 'Berlin';

const Header = ({ menu, stickyBannerVisible }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <header className={s.header}>
        <div className={s.headerItemContainer}>
          <h2 className={s.title}>
            <Link to="/">
              <img
                src={IS_BERLIN_PROJECT ? LogoBerlin : Logo}
                className={s.logo}
                alt={
                  IS_BERLIN_PROJECT
                    ? 'Volksentscheid Grundeinkommen Home'
                    : 'Expedition Grundeinkommen Home'
                }
              />
            </Link>
          </h2>
          <>
            {menu && (
              <nav className={s.nav}>
                <button
                  className={s.menuButton}
                  onClick={() => toggleMenu()}
                  aria-label="Hauptmenü"
                  aria-expanded={menuOpen}
                  aria-controls="menuHeader"
                >
                  {!menuOpen && (
                    <img
                      src={BurgerMenu}
                      className={s.menuIcon}
                      alt="Expedition Grundeinkommen Home"
                    />
                  )}
                  {menuOpen && (
                    <img
                      src={CloseMenu}
                      className={s.menuIcon}
                      alt="Expedition Grundeinkommen Home"
                    />
                  )}
                </button>
                <Menu menu={menu} menuOpen={menuOpen} />
              </nav>
            )}
          </>
        </div>
        {/* {stickyBannerVisible && <StickyDonationBar />} */}
      </header>
    </>
  );
};

export default Header;
