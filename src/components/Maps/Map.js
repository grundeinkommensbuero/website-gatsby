import React from 'react';
import * as s from './style.module.less';
import { SectionInner } from '../Layout/Sections';
import loadable from '@loadable/component';

const LoadableMap = loadable(() => import('./LazyMap'));

export default ({ mapConfig }) => {
  const isSSR = typeof window === 'undefined';
  return (
    <>
      {isSSR ? (
        <Fallback />
      ) : (
        <LoadableMap mapConfig={mapConfig} fallback={<Fallback />} />
      )}
    </>
  );
};

const Fallback = () => (
  <SectionInner wide={true}>
    <div className={s.container}>Lade...</div>
  </SectionInner>
);
