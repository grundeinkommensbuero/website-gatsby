import React from 'react';
import gS from '../style.module.less';

import { Textarea } from '../../Forms/TextInput';
import { Button } from '../../Forms/Button';

export const Anmeldung = ({ userData, compIndex, setCurrentElementByIndex }) => {

  return (
    <section className={gS.pageContainer}>

      <h3 className={gS.moduleTitle}>Anmeldung</h3>
      <p className={gS.descriptionTextLarge}>
        Melde dich an
      </p>

    </section>
  );
};