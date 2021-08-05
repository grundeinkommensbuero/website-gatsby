import React from 'react';
import CreateQuestion from '../../QuestionUbi/CreateQuestion';
import * as gS from '../style.module.less';
import * as s from './style.module.less';
import cN from 'classnames';
import { Link } from 'gatsby';

export const ProfileQuestionUbi = ({ userId, userData }) => {
  return (
    <section className={gS.profilePageGrid}>
      <section
        className={cN(
          gS.editPageSection,
          gS.editSettings,
          s.createQuestionSection
        )}
      >
        <div className={gS.backToProfile}>
          <Link to={`/mensch/${userId}/`}>Zurück zum Profil</Link>
        </div>
        <CreateQuestion userData={userData} />
      </section>
    </section>
  );
};
