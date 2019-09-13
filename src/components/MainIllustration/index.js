import React, { useRef, useEffect } from 'react';
import s from './style.module.less';
import Figure1svg from '!svg-inline-loader!./figure-1-groups_stage-1.svg';
import interact from 'interactjs';

import cN from 'classnames';

export default function() {
  return (
    <div className={s.container} aria-hidden="true">
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

    Array.from(svg.children).forEach((element, index) => {
      if (
        element.tagName === 'path' ||
        element.tagName === 'polygon' ||
        element.tagName === 'g'
      ) {
        makeDraggable(element);
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

function makeDraggable(element) {
  const position = { x: 0, y: 0 };

  interact(element).draggable({
    inertia: false,
    listeners: {
      start(event) {
        console.log(event.type, event.target);
      },
      move(event) {
        // console.log(event);
        position.x += event.dx;
        position.y += event.dy;

        event.target.style.transform = `translate(${position.x}px, ${position.y}px)`;
      },
    },
  });
}
