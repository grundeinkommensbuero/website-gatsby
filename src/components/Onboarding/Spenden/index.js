import React from 'react';
import gS from '../style.module.less';
import DonationForm from '../../Forms/DonationForm';

export const Spenden = ({ userData, userId }) => {
  return (
    <section className={gS.pageContainer}>
      <DonationForm styling="noBackgroundAndPadding" />
    </section>
  );
};