import React from 'react';
import { MunicipalityProgress } from './MunicipalityProgress';
import { InviteFriends } from './InviteFriends';

export const ProgressAndShare = ({ title }) => {
  return (
    <>
      <MunicipalityProgress />
      <InviteFriends />
    </>
  );
};
