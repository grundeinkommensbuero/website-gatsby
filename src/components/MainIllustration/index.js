import React, { useRef, useEffect } from 'react';
import s from './style.module.less';
import cN from 'classnames';
import Stage from '!svg-inline-loader?classPrefix=b-!./figure-1-groups_stage-1.svg';
import StageVertical from '!svg-inline-loader?classPrefix=a-&idPrefix=b-!./figure-1-groups_stage-1-vertical.svg';
let interact;

if (!process.env.STATIC) {
  interact = require('interactjs');
}

export default function({ className }) {
  return (
    <div className={cN(className, s.container)} aria-hidden="true">
      <div className={s.stage}>
        <Illustration className={cN(s.figure, s.stage1)} illustration={Stage} />
        <Illustration
          className={cN(s.figure, s.stage1Vertical)}
          illustration={StageVertical}
        />
      </div>
    </div>
  );
}

function Illustration({ illustration, className }) {
  const containerRef = useRef(null);
  useEffect(() => {
    const svg = containerRef.current.getElementsByTagName('svg')[0];
    const viewBox = svg.getAttribute('viewBox').split(' ');

    const ratioScroll = svg.scrollWidth / svg.scrollHeight;
    const ratioViewBox = parseInt(viewBox[2]) / parseInt(viewBox[3]);
    const ratioCorrection = ratioScroll / ratioViewBox;

    const postionCorrections = {
      x: getCorrectionFactor(
        svg.scrollWidth,
        parseInt(viewBox[2]),
        ratioScroll > ratioViewBox
      ),
      y: getCorrectionFactor(
        svg.scrollHeight,
        parseInt(viewBox[3]),
        ratioScroll < ratioViewBox
      ),
    };

    function getCorrectionFactor(scroll, viewBox, applyRatioCorrection) {
      const basicCorrection = scroll / viewBox;
      if (applyRatioCorrection) {
        return basicCorrection / ratioCorrection;
      } else {
        return basicCorrection;
      }
    }

    if (svg.children) {
      Array.from(svg.children).forEach(element => {
        if (!element.id.includes('background')) {
          Array.from(element.children).forEach(element => {
            if (
              element.tagName === 'path' ||
              element.tagName === 'polygon' ||
              element.tagName === 'g'
            ) {
              makeDraggable(element, postionCorrections);
            }
          });
        }
      });
    }
  }, [containerRef]);

  return (
    <div
      className={cN(className, s.illustration)}
      dangerouslySetInnerHTML={{ __html: illustration }}
      ref={containerRef}
    />
  );
}

function makeDraggable(element, postionCorrections) {
  const position = { x: 0, y: 0 };

  interact(element).draggable({
    inertia: false,
    listeners: {
      move(event) {
        position.x += event.dx / postionCorrections.x;
        position.y += event.dy / postionCorrections.y;

        event.target.style.transform = `translate(${position.x}px, ${position.y}px)`;
      },
    },
  });
}
