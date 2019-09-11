import React from 'react';
import Link from 'gatsby-link';
import s from './style.module.less';

export default () => (
  <footer className={s.footer}>
    <div className={s.copyright}>&copy; Grundeinkommensbüro 2019</div>
    <nav className={s.nav}>
      <Link to="/privacy">Datenschutz</Link>
      <Link to="/imprint">Impressum</Link>
    </nav>
  </footer>
);
