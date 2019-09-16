import React, { useRef, useEffect } from 'react';
import s from './style.module.less';
import cN from 'classnames';
import Figure1svg from '!svg-inline-loader!./figure-1-groups_stage-1.svg';
import interact from 'interactjs';

export default function({ className }) {
  return (
    <div className={cN(className, s.container)} aria-hidden="true">
      <div className={s.stage}>
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
    const svg = document.getElementsByTagName('svg')[0];
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

    Array.from(svg.children).forEach((element, index) => {
      if (
        element.tagName === 'path' ||
        element.tagName === 'polygon' ||
        element.tagName === 'g'
      ) {
        makeDraggable(element, postionCorrections);
      }
    });
  });

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
