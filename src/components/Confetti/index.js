import React, { useRef, useEffect } from 'react';
import s from './style.module.less';
import cN from 'classnames';
let canvasConfetti;

if (!process.env.STATIC) {
  canvasConfetti = require('canvas-confetti');
}

const colors = [
  '#fc484c',
  '#22c8ee',
  '#3423f6',
  '#e5b5c8',
  '#7d69f6',
  '#fef377',
  '#f5f5f5',
];

export default ({ className }) => {
  const canvas = useRef(null);

  useEffect(() => {
    if (canvas) {
      const confetti = canvasConfetti.create(canvas.current, {
        resize: true,
        useWorker: true,
      });

      if (window.innerWidth > 600) {
        (function frame() {
          confetti({
            particleCount: 1,
            angle: 60,
            spread: 55,
            origin: { x: 0, y: 0.25 },
            colors: [
              ...colors[Math.round(Math.random() * (colors.length - 1))],
            ],
            ticks: 400,
          });
          confetti({
            particleCount: 1,
            angle: 120,
            spread: 55,
            origin: { x: 1, y: 0.25 },
            colors: [
              ...colors[Math.round(Math.random() * (colors.length - 1))],
            ],
            ticks: 400,
          });

          requestAnimationFrame(frame);
        })();
      } else {
        (function frame() {
          confetti({
            particleCount: 1,
            angle: 270,
            spread: 180,
            origin: { x: 0.5, y: 0 },
            startVelocity: 20,
            colors: [
              ...colors[Math.round(Math.random() * (colors.length - 1))],
            ],
          });

          requestAnimationFrame(frame);
        })();
      }
    }
  }, [canvas]);
  return <canvas ref={canvas} className={cN(className, s.canvas)} />;
};
