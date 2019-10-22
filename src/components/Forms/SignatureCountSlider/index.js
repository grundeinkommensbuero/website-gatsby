import React from 'react';
import s from './style.module.less';
import { TextInputInline } from '../TextInput';
import { Button } from '../Button';
import cN from 'classnames';
import { shuffle } from '../../utils';

const HAND_ILLUSTRATIONS = [
  require('./hand_1.svg'),
  require('./hand_2.svg'),
  require('./hand_3.svg'),
  require('./hand_4.svg'),
  require('./hand_5.svg'),
  require('./hand_6.svg'),
];

const MAX_HANDS = 100;
const MAX_TILT = 10;
const BOTTOM_SIDE_RATIO = 0.3;

const HANDS_ARRAY = Array.apply(null, Array(MAX_HANDS)).map((hand, index) => {
  return {
    hand: Math.floor(Math.random() * HAND_ILLUSTRATIONS.length),
    tilt: Math.round(Math.random() * MAX_TILT),
    position: (1 / MAX_HANDS) * index,
    // side: sides[Math.floor(Math.random() * sides.length)],
    size: Math.random(),
  };
});

shuffle(HANDS_ARRAY);

export const SignatureCountSlider = ({ input, label, min, max }) => (
  <>
    <label htmlFor={`slider_${input.name}`}>{label}</label>
    <div className={s.inputContainer}>
      <div className={s.sliderContainer}>
        <input
          className={s.input}
          id={`slider_${input.name}`}
          min={min}
          max={max}
          aria-label={label}
          {...input}
        />
      </div>
      <TextInputInline
        type="number"
        min={min}
        max={max}
        name={input.name}
        value={input.value}
        onBlur={input.onBlur}
        onChange={input.onChange}
        className={s.textInput}
        aria-label={label}
      />
    </div>
    <div className={s.stage}>
      <div className={s.stageInner}>
        {HANDS_ARRAY.map((hand, index) => (
          <Hand key={index} index={index} hand={hand} count={input.value} />
        ))}
      </div>
    </div>
  </>
);

const Hand = ({ index, hand, count }) => {
  if (count < index + 1) {
    return null;
  }

  let style;
  let side;
  let position;

  if (hand.position < BOTTOM_SIDE_RATIO) {
    side = 'left';
    position = hand.position / BOTTOM_SIDE_RATIO;
  } else if (hand.position > 1 - BOTTOM_SIDE_RATIO) {
    side = 'right';
    position = (hand.position - 1 + BOTTOM_SIDE_RATIO) / BOTTOM_SIDE_RATIO;
  } else {
    const range = 1 - BOTTOM_SIDE_RATIO * 2;
    side = 'bottom';
    position =
      hand.position / (BOTTOM_SIDE_RATIO + BOTTOM_SIDE_RATIO * range) -
      1 +
      BOTTOM_SIDE_RATIO;
  }

  if (side === 'bottom') {
    style = { left: position * 100 + '%' };
  } else {
    style = { bottom: position * 100 + '%' };
  }

  return (
    <div
      style={style}
      className={cN(s.handContainer, s[`handContainer_${side}`])}
    >
      <img
        className={s.hand}
        src={HAND_ILLUSTRATIONS[hand.hand]}
        style={{ transform: `translateY(${hand.size * -2}rem)` }}
      />
    </div>
  );
};
