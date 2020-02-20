import React from 'react';
import { SectionInner } from '../Layout/Sections';

export default ({ mode }) => {
  return (
    <>
      <SectionInner>{mode}</SectionInner>
    </>
  );
};
