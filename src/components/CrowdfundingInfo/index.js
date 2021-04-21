import React from 'react';
import videoPlaceholder from './videoPlaceholder.png';
import { Button } from '../Forms/Button';
import s from './style.module.less';
import { CrowdfundingVisual } from './CrowdfundingVisual';


export const CrowdfundingInfo = () => {
  return (
    <>
      <h2>Crowdfunding: Unterstütze uns!</h2>
      <div className={s.contentContainer}>
        <img className={s.videoPlaceholder} alt="" src={videoPlaceholder} />
        <p className={s.description}>
          Der einfachste Ansatz ist gleichzeitig der effektivste: ein bedingungsloses
          Grundeinkommen.“ (Martin Luther King jr.) Große Veränderungen brauchen Menschen,
          die an sie glauben. Menschen wie du und ich – und Martin Luther King. Mit deiner
          Spende bringst du das Grundeinkommen von der Utopie zur Realität und stärkst
          gleichzeitig noch unsere Demokratie. Ganz nach dem Motto: Eine kleine Spende für
          dich, ein großer Schritt für die Menschheit!
        </p>
      </div>
      <div>
        <CrowdfundingVisual />
      </div>
      <div className={s.containerCTA}>
        <Button onClick={() =>
          window.open(
            'https://www.startnext.com/expedition-bge',
            '_blank'
          )
        }
        >
          Zum Crowdfunding
      </Button>
      </div>
    </>
  )
}