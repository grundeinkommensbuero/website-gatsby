import React from 'react';
import menuElements from './BreadcrumbMenu.json';
import cN from 'classnames';
import s from './style.module.less';

export const BreadcrumbLinks = ({ setCurrentElement, currentElement, toggleOverlay }) => {

  const pathMatchesMenuElement = (element) => {
    return currentElement === element;
  };

  const closeIcon = require('./close-icon.svg');

  return menuElements.map(element => {
    if (element.name !== 'close') {
      return (
        <div
          aria-hidden={true}
          onClick={() => setCurrentElement(element.name)}
          onKeyUp={() => setCurrentElement(element.name)}
          key={element.name}
          className={
            cN(s.breadcrumbElement,
              { [s.breadcrumbElementActive]: pathMatchesMenuElement(element.name) }
            )}
        >
          {element.title}
        </div>
      )
    } else {
      return (
        <div
          aria-hidden={true}
          onClick={() => toggleOverlay()}
          onKeyUp={() => toggleOverlay()}
          key={element.name}
          className={
            cN(s.breadcrumbElement,
              { [s.breadcrumbElementActive]: pathMatchesMenuElement(element.name) }
            )}
        >
          <img
            aria-hidden="true"
            alt=""
            className={s.closeButton}
            src={closeIcon}
          />
        </div>
      )
    }
  })
}