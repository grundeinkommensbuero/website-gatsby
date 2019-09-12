import React, { useRef, useEffect } from 'react';
import s from './style.module.less';
import Figure1svg from '!svg-inline-loader!./figure-1.svg';
import Figure1 from './figure-1.svg';
import Figure2 from './figure-2.svg';

import cN from 'classnames';

export default function() {
  console.log(Figure1svg);
  return (
    <div className={s.container} aria-hidden="true">
      <div className={s.stage}>
        {/* <img className={cN(s.figure, s.figure1)} src={Figure1} />
        <img className={cN(s.figure, s.figure2)} src={Figure2} /> */}
        <Illustration
          className={cN(s.figure, s.figure1)}
          illustration={Figure1svg}
        />
      </div>
    </div>
  );
}

function Illustration({ illustration, className }) {
  const containerRef = useRef(null);
  useEffect(() => {
    console.log(containerRef.current);
  });
  return (
    <div
      className={cN(className, s.illustration)}
      dangerouslySetInnerHTML={{ __html: illustration }}
      ref={containerRef}
    />
  );
}
