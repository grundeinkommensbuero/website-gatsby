import React, { useEffect, useRef } from 'react';

export const CounterWrapper = props => {
  console.log(props);
  const { children, path } = props;
  const isGemeinde = path.includes('gemeinden');

  const trueRenderCount = useRef(1);
  console.log('render', trueRenderCount);
  useEffect(() => {
    // console.log("EFFECTS");
    trueRenderCount.current = trueRenderCount.current + 1;
  });

  return (
    <>
      {isGemeinde && (
        <div style={{ position: 'relative', zIndex: 999 }}>
          TEST! {trueRenderCount.current}
        </div>
      )}
      {children}
    </>
  );
};
