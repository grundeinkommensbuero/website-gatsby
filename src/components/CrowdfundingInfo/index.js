import React from 'react';
import { Button } from '../Forms/Button';
import * as s from './style.module.less';
import { CrowdfundingVisual } from './CrowdfundingVisual';
import { YoutubeEmbed } from '../Layout/Sections';

export const CrowdfundingInfo = () => {
  return (
    <>
      <h2>Mach mit beim Crowdfunding!</h2>
      <div className={s.contentContainer}>
        <div className={s.video}>
          <YoutubeEmbed url={'I7DjXaVPI2M'} />
        </div>
        <p className={s.description}>
          „Der einfachste Ansatz ist gleichzeitig der effektivste: ein
          bedingungsloses Grundeinkommen.“ (Martin Luther King)
          <br />
          <br />
          Große Veränderungen brauchen Menschen, die an sie glauben. Menschen
          wie du und ich. Mit deiner Spende beim Crowdfunding bringst du das
          Grundeinkommen von der Utopie zur Realität und stärkst gleichzeitig
          noch unsere Demokratie. Egal ob 1&#8239;€ oder 100&#8239;€ – jede
          Spende bringt das Thema voran. Ganz nach dem Motto: Eine kleine Spende
          für dich, ein großer Schritt für die Menschheit!
        </p>
      </div>
      <div className={s.containerCTA}>
        <Button
          onClick={() => window.open('https://www.startnext.com/Dv1', '_blank')}
        >
          Zum Crowdfunding
        </Button>
      </div>
      <div>
        <CrowdfundingVisual />
      </div>
    </>
  );
};
