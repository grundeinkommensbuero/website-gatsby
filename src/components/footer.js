import React from 'react';
import Link from 'gatsby-link';
import styles from './footer.module.css';

export default () => (
  <footer className={styles.siteFooter}>
    <div className={styles.siteFooterContent}>
      <section className="copyright">
        &copy; Grundeinkommensbüro 2019 | <Link to="/privacy">Datenschutz</Link> | <Link to="/imprint">Impressum</Link>
      </section>
    </div>
  </footer>
)




