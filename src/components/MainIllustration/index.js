import React, { useRef, useEffect } from 'react';
import s from './style.module.less';
import Figure1svg from '!svg-inline-loader!./figure-1.svg';
import interact from 'interactjs';
import Figure1 from './figure-1.svg';
import Figure2 from './figure-2.svg';

import cN from 'classnames';

export default function() {
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
    const svg = document.getElementsByTagName('svg')[0];

    console.log(svg.children);
    Array.from(svg.children).forEach((element, index) => {
      console.log(index, element);

      if (element.tagName === 'path' || element.tagName === 'polygon') {
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
    // make the element fire drag events
    //   origin: 'self', // (0, 0) will be the element's top-left
    inertia: true, // start inertial movement if thrown
    //   modifiers: [
    //     interact.modifiers.restrict({
    //       restriction: 'self', // keep the drag coords within the element
    //     }),
    //   ],
    listeners: {
      start(event) {
        console.log(event.type, event.target);
      },
      move(event) {
        position.x += event.dx;
        position.y += event.dy;

        event.target.style.transform = `translate(${position.x}px, ${position.y}px)`;
      },
    },
  });
}
