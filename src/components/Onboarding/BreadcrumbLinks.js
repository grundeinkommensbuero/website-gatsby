import React from 'react';
import menuElements from './BreadcrumbMenu.json';
import cN from 'classnames';
import * as s from './style.module.less';

export const BreadcrumbLinks = ({
  setCurrentElement,
  currentElement,
  setOverlayOpen,
}) => {
  const pathMatchesMenuElement = element => {
    return currentElement === element;
  };

  const closeIcon = require('!svg-inline-loader!./close-icon.svg');

  return menuElements.map(element => {
    if (element.name !== 'close') {
      return (
        <button
          aria-hidden={true}
          onClick={() => setCurrentElement(element.name)}
          onKeyUp={() => setCurrentElement(element.name)}
          key={element.name}
          className={cN(s.breadcrumbElement, {
            [s.breadcrumbElementActive]: pathMatchesMenuElement(element.name),
          })}
        >
          {element.title}
        </button>
      );
    } else {
      return (
        <button
          onClick={() => setOverlayOpen(false)}
          key={element.name}
          aria-label="Schließen"
          className={cN(s.breadcrumbElement, {
            [s.breadcrumbElementActive]: pathMatchesMenuElement(element.name),
          })}
        >
          <div
            alt=""
            aria-hidden="true"
            className={s.closeButtonBreadcrumb}
            dangerouslySetInnerHTML={{ __html: closeIcon }}
          ></div>
        </button>
      );
    }
  });
};
