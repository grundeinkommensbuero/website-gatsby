import React from 'react';
import s from './style.module.less';
import SignaturePledge from './SignaturePledge';
import GeneralPledge from './GeneralPledge';

export default ({ className, pledgeId }) => {
  const isGeneralPlede = pledgeId.startsWith('general');
  return (
    <div className={className}>
      <div className={s.jumpToAnchorWrapper}>
        <div className={s.jumpToAnchor} id="pledge" />
      </div>
      {isGeneralPlede ? (
        <GeneralPledge pledgeId={pledgeId} />
      ) : (
        <SignaturePledge pledgeId={pledgeId} />
      )}
    </div>
  );
};
