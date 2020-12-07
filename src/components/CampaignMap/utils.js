import { WebMercatorViewport } from '@deck.gl/core';

export const getPercentToGoal = (number, goal) => {
  return Number(((number / goal) * 100).toFixed(1));
};

export const getLayeredData = ({
  municipalities,
  signups,
  events,
  labels,
  animateOnLoad,
}) => {
  // console.time('timeToLoopMunicipalities');
  const dataMunicipalities = [];
  const signupsLookup = [...signups];
  const dataSignups = [];
  const eventsLookup = [...events];
  const dataEvents = [];
  const labelsLookup = [...labels];
  const dataLabels = [];
  for (let i = 0; i < municipalities.length; i++) {
    // Signups, percentToGoal, isEvent are needed
    // accross signups, events and labels
    // 1. Initialized 0
    // 2. Overwrite in events on match
    // 3a. Check if isEvents in signups --> marker not added to signups
    // 3b. Overwrite in labels on match
    // 4. Stays 0 if not overwritten for labels
    let signups = 0;
    let percentToGoal = 0;
    let isEvent = false;
    // ---
    // constants
    const {
      goal,
      coordinates: [longitude, latitudeEnd],
    } = municipalities[i];

    // ---- Check events / animation ---------------------------------------------------------
    for (let k = 0; k < eventsLookup.length; k++) {
      if (municipalities[i].ags === eventsLookup[k].ags) {
        // Flag
        isEvent = true;

        // Destructuring
        const { category, signups: signupsRange } = eventsLookup[k];

        // Numbers
        signups = signupsRange[0];
        if (!animateOnLoad) {
          signups = signupsRange[1];
        }
        const [prev, cur] = signupsRange;
        const percentToGoalRange = [
          getPercentToGoal(prev, goal),
          getPercentToGoal(cur, goal),
        ];
        percentToGoal = percentToGoalRange[0];
        if (!animateOnLoad) {
          percentToGoal = percentToGoalRange[1];
        }

        // Coordinates
        const latitudeStart = 58;
        const latitudeRange = [latitudeStart, latitudeEnd];
        let latitude = category === 'new' ? latitudeStart : latitudeEnd;
        if (!animateOnLoad) {
          latitude = latitudeEnd;
        }

        // Push
        dataEvents.push({
          ...municipalities[i],
          ...eventsLookup[k],
          signups,
          signupsRange,
          percentToGoal,
          percentToGoalRange,
          longitude,
          latitude,
          latitudeRange,
        });

        // TODO: decide if one ags should only be once in the animation
        // Currently: multiple occurences are possible
        // Uncomment the next two line for unique ags in animations
        // eventsLookup.splice(k, 1);
        // break;
      }
    }

    // ---- Check signups --------------------------------------------------------------------
    for (let j = 0; j < signupsLookup.length; j++) {
      // const signup = signupsLookup[j];
      if (isEvent || signupsLookup[j].signups === 0) {
        signupsLookup.splice(j, 1);
        break;
      }

      if (municipalities[i].ags === signupsLookup[j].ags) {
        signups = signupsLookup[j].signups;
        percentToGoal = getPercentToGoal(signups, municipalities[i].goal);
        const [longitude, latitude] = municipalities[i].coordinates;

        dataSignups.push({
          ...municipalities[i],
          signups,
          percentToGoal,
          longitude,
          latitude,
        });
        signupsLookup.splice(j, 1);
        break;
      }
    }

    // ---- Check labels ---------------------------------------------------------------------
    for (let l = 0; l < labelsLookup.length; l++) {
      if (municipalities[i].name === labelsLookup[l]) {
        const [longitude, latitude] = municipalities[i].coordinates;

        dataLabels.push({
          ...municipalities[i],
          signups,
          percentToGoal,
          longitude,
          latitude,
        });
        labelsLookup.splice(l, 1);
        break;
      }
    }
    dataMunicipalities.push({
      ...municipalities[i],
      longitude,
      latitude: latitudeEnd,
      signups,
      percentToGoal,
    });
  }
  // console.timeEnd('timeToLoopMunicipalities');
  // Checks
  // console.log(dataSignups);
  // console.log(dataLabels);
  // console.log(dataEvents);

  return { dataSignups, dataLabels, dataEvents, dataMunicipalities };
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
