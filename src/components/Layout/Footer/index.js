import React from 'react';
import Link from 'gatsby-link';
import style from './style.module.css';

export default () => (
  <footer className={style.siteFooter}>
    <div className={style.siteFooterContent}>
      <section className="copyright">
        &copy; Grundeinkommensbüro 2019 | <Link to="/privacy">Datenschutz</Link>{' '}
        | <Link to="/imprint">Impressum</Link>
      </section>
    </div>
  </footer>
);
