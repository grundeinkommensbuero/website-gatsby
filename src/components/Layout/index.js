import React from 'react';
import Header from './Header';
import Footer from './Footer';
import s from './style.module.less';
import '../style/base.less';
import Sections from '../Sections';

class Template extends React.Component {
  render() {
    const { children, sections } = this.props;

    return (
      <>
        <Header sections={sections} />
        <main className={s.main}>
          {children}
          <Sections sections={sections} />
        </main>
        <Footer />
      </>
    );
  }
}

export default Template;
