export const diffSeconds = (dt2, dt1) => {
  let diff = (dt2.getTime() - dt1.getTime()) / 1000;
  return Math.abs(Math.round(diff));
};

export const diffCount = (c2, c1) => {
  let diff = c1 - c2;
  return diff;
};

export const numberWithDots = num => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};