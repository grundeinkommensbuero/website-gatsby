import React from 'react';
import s from './style.module.less';
import { TextInputInline } from '../TextInput';
import { Button } from '../Button';

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
const sides = ['left', 'bottom', 'right'];

const HANDS_ARRAY = Array.apply(null, Array(MAX_HANDS)).map(() => {
  return {
    hand: Math.floor(Math.random() * HAND_ILLUSTRATIONS.length),
    tilt: Math.round(Math.random() * MAX_TILT),
    position: Math.round(Math.random() * 100),
    side: sides[Math.floor(Math.random() * sides.length)],
  };
});

export const SignatureCountSlider = ({
  input,
  label,
  min,
  max,
  openSecondPart,
  isSecondPartOpen,
}) => (
  <>
    {/* <label htmlFor={`slider_${input.name}`}>{label}</label> */}
    {console.log(HAND_ILLUSTRATIONS)}
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
    {!isSecondPartOpen && (
      <Button onClick={openSecondPart}>So ist's recht!</Button>
    )}
    <div className={s.stage}>
      {HANDS_ARRAY.map((hand, index) => (
        <Hand key={index} index={index} hand={hand} count={input.value} />
      ))}
    </div>
  </>
);

const Hand = ({ index, hand, count }) => {
  if (count < index + 1) {
    return null;
  }
  return (
    <div className={s.handContainer} style={{ left: hand.position + '%' }}>
      <img className={s.hand} src={HAND_ILLUSTRATIONS[hand.hand]} />
    </div>
  );
};
