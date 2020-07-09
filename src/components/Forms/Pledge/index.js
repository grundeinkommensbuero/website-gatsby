import React from 'react';
import s from './style.module.less';
import SignaturePledge from './SignaturePledge';

export default ({ className, pledgeId }) => {
  return (
    <div className={className}>
      <div className={s.jumpToAnchorWrapper}>
        <div className={s.jumpToAnchor} id="pledge" />
      </div>
      <SignaturePledge pledgeId={pledgeId} />
    </div>
  );
};
