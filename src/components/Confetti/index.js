import React, { useRef, useEffect, useState } from 'react';
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
  const [isInView, setIsInView] = useState(false);
  const [confetti, setConfetti] = useState({});
  let animating = true;

  useEffect(() => {
    const confetti = canvasConfetti.create(canvas.current, {
      resize: true,
      useWorker: true,
    });
    setConfetti({ confetti: confetti });
  }, [setConfetti]);

  useEffect(() => {
    return () => {
      if (confetti.confetti) {
        confetti.confetti.reset();
      }
    };
  }, [confetti]);

  useEffect(() => {
    if (canvas && confetti.confetti) {
      const frame = () => {
        if (isInView && Math.random() < 0.2) {
          if (window.innerWidth > 600) {
            confetti.confetti({
              particleCount: 1,
              angle: 60,
              spread: 55,
              origin: { x: 0, y: 0.25 },
              colors: [
                ...colors[Math.round(Math.random() * (colors.length - 1))],
              ],
              ticks: 400,
            });
            confetti.confetti({
              particleCount: 1,
              angle: 120,
              spread: 55,
              origin: { x: 1, y: 0.25 },
              colors: [
                ...colors[Math.round(Math.random() * (colors.length - 1))],
              ],
              ticks: 400,
            });
          } else {
            confetti.confetti({
              particleCount: 1,
              angle: 270,
              spread: 180,
              origin: { x: 0.5, y: 0 },
              startVelocity: 20,
              colors: [
                ...colors[Math.round(Math.random() * (colors.length - 1))],
              ],
            });
          }
        }
        if (animating && isInView) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }

    return () => {
      animating = false;
    };
  }, [isInView, confetti]);

  useEffect(() => {
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setIsInView(true);
            } else {
              setIsInView(false);
            }
          });
        },
        {
          threshold: 0.1,
        }
      );
      observer.observe(canvas.current);
    } else {
      setIsInView(true);
    }
  }, [setIsInView]);

  // eslint-disable-next-line jsx-a11y/control-has-associated-label
  return <canvas ref={canvas} className={cN(className, s.canvas)} />;
};
