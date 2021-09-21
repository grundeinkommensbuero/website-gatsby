import React, { useState } from 'react';
import Link from 'gatsby-link';

// import { OverlayContext } from '../../../context/Overlay';
// import { Button } from '../../Forms/Button';

import * as s from './style.module.less';
import Logo from './logo.svg';
import Menu from './Menu';
// import { HertieCrowdfunding } from './StickyDonationBar/HertieCrowdfunding';

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
                src={Logo}
                className={s.logo}
                alt="Expedition Grundeinkommen Home"
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
                  <div className={s.menuButtonBars}>
                    <div className={s.menuButtonBar} />
                    <div className={s.menuButtonBar} />
                    <div className={s.menuButtonBar} />
                  </div>
                </button>
                <Menu menu={menu} menuOpen={menuOpen} />
              </nav>
            )}
          </>
        </div>
        {/* {stickyBannerVisible && <HertieCrowdfunding />} */}
      </header>
    </>
  );
};

export default Header;
