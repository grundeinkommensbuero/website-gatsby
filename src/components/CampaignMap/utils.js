import { WebMercatorViewport } from '@deck.gl/core';

export const getMergedSignups = ({ municipalities, signups, events }) => {
  let data = signups.filter(x => x.signups > 0);
  const eventAGS = events.map(e => e.ags);
  data = signups.filter(s => !eventAGS.includes(s.ags));

  data = data.map((s, i) => {
    const data = municipalities.find(m => m.ags === s.ags);
    const percentToGoal = +((s.signups / data.goal) * 100).toFixed(1);
    const [longitude, latitude] = data.coordinates;
    return { ...data, ...s, longitude, latitude, percentToGoal };
  });

  return data;
};

export const getMergedLabels = ({ municipalities, labels, signups }) => {
  const dataLabels = labels.map(l => {
    const data = municipalities.find(m => m.name === l);
    const { ags, name, coordinates, goal } = data;
    const curSignups = signups.find(s => s.ags === ags).signups;
    const percentToGoal = (curSignups / goal) * 100;
    const [longitude, latitude] = data.coordinates;

    return { coordinates, longitude, latitude, name, percentToGoal };
  });
  return dataLabels;
};

export const getMergedEvents = ({ municipalities, events }) => {
  const categories = ['win', 'new', 'change'];
  // Only necessary for the backend:
  // NOTE: small relative changes are not visible on the map
  // right now
  // const thresholds = { absolute: 5000, relative: 30 };
  const latitudeStart = 58;
  const dataEvents = events.map(e => {
    const data = municipalities.find(m => m.ags === e.ags);
    const {
      goal,
      coordinates: [longitude, latitudeEnd],
    } = data;
    const [prev, cur] = e.signups;
    const signupsRange = e.signups;
    const signups = prev;
    const percentToGoalRange = [(prev / goal) * 100, (cur / goal) * 100];
    const percentToGoal = percentToGoalRange[0];
    const changeAbsolute = cur - prev;
    const changeRelative = (cur / prev - 1) * 100;
    let category = '';
    // TODO: multiple animations for one municipality?
    // --> Change to array
    if (cur >= goal) {
      category = categories[0];
    } else if (prev === 0) {
      category = categories[1];
    } else {
      category = categories[2];
    }
    // TODO: Decide the destinction is necessary?
    // } else if (changeAbsolute >= thresholds.absolute) {
    //   category = categories[2];
    // } else if (changeRelative >= thresholds.relative) {
    //   category = categories[3];
    // }
    const latitudeRange = [latitudeStart, latitudeEnd];
    const latitude = category === 'new' ? latitudeStart : latitudeEnd;
    return {
      ...data,
      ...e,
      signupsRange,
      signups,
      percentToGoalRange,
      percentToGoal,
      longitude,
      latitudeRange,
      latitude,
      changeAbsolute,
      changeRelative,
      category,
    };
  });
  // Group? --> not needed
  // const groupedByCategories = categories
  //   .map(c => dataEvents.filter(d => d.category === c))
  //   .filter(g => g.length > 0);

  // console.log(dataEvents);
  return dataEvents;
};

export const zoomToBounds = ({
  initialViewState,
  setInitialViewState,
  dimensionsUpdate,
  setZoom,
  zoomBounds,
  setZoomBounds,
  zoomPadding,
  zoomMin,
  setZoomMin,
  touched,
  setTouched,
}) => {
  const { width, height } = dimensionsUpdate;
  let localZoomBounds = zoomBounds;
  if (touched) {
    setTouched(false);
    const viewport = new WebMercatorViewport(initialViewState);
    const nw = viewport.unproject([0, 0]);
    const se = viewport.unproject([viewport.width, viewport.height]);
    localZoomBounds = [nw, se];
    setZoomBounds(localZoomBounds);
  }
  const viewport = new WebMercatorViewport({
    ...initialViewState,
    width,
    height,
  });

  const { longitude, latitude, zoom } = viewport.fitBounds(
    localZoomBounds,
    zoomPadding
  );

  let minZoom = zoomMin;
  if (zoom < zoomMin) {
    setZoomMin(zoom);
    minZoom = zoom;
  }

  if (initialViewState.zoom !== zoom) {
    setZoom(zoom);
    setInitialViewState({
      ...initialViewState,
      longitude,
      latitude,
      zoom,
      minZoom,
      width,
      height,
      transitionDuration: 125,
      // https://easings.net/#easeInOutQuad
      transitionEasing: t => {
        return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      },
    });
  }
};
