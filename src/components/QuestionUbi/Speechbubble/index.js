import React from 'react';
import s from './style.module.less';
import cN from 'classnames';
import SpeechbubbleTop from '!svg-inline-loader!./speechbubble_top.svg';
import SpeechbubbleBottom from '!svg-inline-loader!./speechbubble_bottom.svg';

export const Speechbubble = ({ children, className, isSmall = false }) => (
  <div className={cN(s.container, className, { [s.small]: isSmall })}>
    <div className={cN(s.body)}>{children}</div>
    <div
      className={cN(s.svg, s.svgTop)}
      dangerouslySetInnerHTML={{
        __html: addPreserveAspectRatioToSvg(SpeechbubbleTop),
      }}
    />
    <div
      className={cN(s.svg, s.svgBottom)}
      dangerouslySetInnerHTML={{
        __html: addPreserveAspectRatioToSvg(SpeechbubbleBottom),
      }}
    />
  </div>
);

function addPreserveAspectRatioToSvg(svg) {
  return svg.replace('<svg', '<svg preserveAspectRatio="none"');
}
