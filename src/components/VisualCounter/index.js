import React, { useState, useEffect } from 'react';

const INTERVALL = 50;

export default ({ end = 0, start = 0, time = 1000 }) => {
  const [displayCount, setDisplayCount] = useState(start);
  const distance = end - start;

  useEffect(() => {
    if (end !== displayCount) {
      const rounds = Math.round(time / INTERVALL);
      for (let round = 0; round <= rounds; round++) {
        setTimeout(() => {
          setDisplayCount(Math.round((round / rounds) * distance) + start);
        }, (round / rounds) * time);
      }
    }
  }, [end]);

  return <>{displayCount}</>;
};
