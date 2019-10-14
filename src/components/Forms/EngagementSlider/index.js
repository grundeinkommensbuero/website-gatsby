import React from 'react';

export const EngagementSlider = ({ input, label, min, max }) => (
  <div>
    <label htmlFor={`slider_${input.name}`}>{label}</label>
    <br />
    <input id={`slider_${input.name}`} min={min} max={max} {...input} />
  </div>
);
