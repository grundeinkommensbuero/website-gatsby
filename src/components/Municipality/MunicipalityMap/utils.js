import { WebMercatorViewport } from '@deck.gl/core';
import { scaleLinear } from 'd3-scale';
import { ScatterplotLayer } from '@deck.gl/layers';

export const getPercentToGoal = (number, goal) => {
  return Number(((number / goal) * 100).toFixed(1));
};

export const getLayeredData = ({
  municipalities,
  signups,
  events,
  labels,
  initialMapAnimation,
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
    // 1. Initialized 0 / false
    // 2. Overwrite in events on match
    // 3a. Overwrite in signups on match
    // 3b. Events: Check if municipality is in events --> marker will not be added to dataSignups
    let signups = 0;
    let signupsLabels = 0; // for labels
    let percentToGoal = 0;
    let percentToGoalLabels = 0;
    // ---
    // constants
    const {
      goal,
      coordinates: [longitude, latitudeEnd],
      slug,
    } = municipalities[i];

    // ---- Check events / animation ---------------------------------------------------------
    for (let k = 0; k < eventsLookup.length; k++) {
      if (municipalities[i].ags === eventsLookup[k].ags) {
        // Important note: if the municipality is in the events-layer,
        // we don’t want it in the signup-layer as well
        // 1. Find ags in signupslookup
        // Secondary Note:  you can check if there’s a faster way to do this (this should only be executed less than 20–40 times though)
        const signupIndex = signupsLookup.findIndex(
          x => x.ags === eventsLookup[k].ags
        );
        // 2. Remove it from the signupsLookup array
        signupsLookup.splice(signupIndex, 1);

        // Destructuring
        const { category, signups: signupsRange } = eventsLookup[k];

        // Numbers
        signups = initialMapAnimation ? signupsRange[0] : signupsRange[1];
        signupsLabels = signupsRange[1]; // for Labels

        const [prev, cur] = signupsRange;
        const percentToGoalRange = [
          getPercentToGoal(prev, goal),
          getPercentToGoal(cur, goal),
        ];
        percentToGoal = initialMapAnimation
          ? percentToGoalRange[0]
          : percentToGoalRange[1];
        percentToGoalLabels = percentToGoalRange[1];

        // Coordinates
        const latitudeStart = 58;
        const latitudeRange = [latitudeStart, latitudeEnd];
        let latitude =
          category === 'new' && initialMapAnimation
            ? latitudeStart
            : latitudeEnd;

        let hasLabel = false;
        // Add event so animated labels layer
        for (let l = 0; l < labelsLookup.length; l++) {
          if (municipalities[i].name === labelsLookup[l]) {
            hasLabel = true;
            labelsLookup.splice(l, 1);
            break;
          }
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
          hasLabel,
          slug,
        });

        // Set signupRange to end for the overall municipalities data (labels)

        // TODO: decide if one ags should only be once in the animation
        // Currently: multiple occurences are possible
        // Uncomment the next two lines for unique ags in animations
        // eventsLookup.splice(k, 1);
        // break;
      }
    }

    // ---- Check signups --------------------------------------------------------------------
    for (let j = 0; j < signupsLookup.length; j++) {
      if (municipalities[i].ags === signupsLookup[j].ags) {
        signups = signupsLookup[j].signups;
        percentToGoal = getPercentToGoal(signups, municipalities[i].goal);
        const [longitude, latitude] = municipalities[i].coordinates;
        const population = municipalities[i].population;

        dataSignups.push({
          ...municipalities[i],
          signups,
          percentToGoal,
          longitude,
          latitude,
          population,
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
    signups = signupsLabels > 0 ? signupsLabels : signups; // for labels
    percentToGoal =
      percentToGoalLabels > 0 ? percentToGoalLabels : percentToGoal; // for labels

    dataMunicipalities.push({
      ...municipalities[i],
      longitude,
      latitude: latitudeEnd,
      signups,
      percentToGoal,
    });
  }

  // console.timeEnd('timeToLoopMunicipalities');

  // This code block calculates the distance of every municipality to
  // a set of "starter" municipalities,
  // allows you to create an animation that looks like a viral spread
  // calculations are done with turf:
  // import distance from '@turf/distance';
  // import { point } from '@turf/helpers';
  //   const dataSignupsWithDistance = dataSignups.map((f, i) => {
  //     const options = { units: 'kilometers' };
  //     const tos = [
  //       { name: 'Berlin', coordinates: [13.405538, 52.51767] },
  //       { name: 'Hamburg', coordinates: [9.99697, 53.550678] },
  //       { name: 'Köln', coordinates: [6.957068, 50.938107] },
  //       { name: 'Leipzig', coordinates: [12.377931, 51.338288] },
  //       { name: 'Frankfurt', coordinates: [8.682433, 50.11088] },
  //       { name: 'Freiburg', coordinates: [7.849877, 47.994786] },
  //       { name: 'München', coordinates: [11.573599, 48.143439] },
  //     ];
  //     const distances = tos.map(t =>
  //       distance(point(f.coordinates), point(t.coordinates), options)
  //     );

  //     const minDistance = Math.min(...distances);

  //     return { ...f, distance: minDistance };
  //   });

  // Sort the signups so small Markers are on top of bigger ones
  dataSignups.sort((a, b) => {
    return b.signups - a.signups;
  });

  // Log the amount of municipalities per event type
  // console.log(
  //   ['change', 'win', 'new'].map(
  //     e => dataEvents.filter(x => x.category === e).length + 'x ' + e
  //   )
  // );

  return {
    dataSignups,
    dataLabels,
    dataEvents,
    dataMunicipalities,
  };
};

// ---- Colors ---------------------------------------------------------------------------

const scalePercentToColor = scaleLinear()
  .domain([0, 99.9999, 100, Infinity])
  .range(['#00C8F0', '#43006a', '#fc484c', '#fc484c']);

const colorToArray = (string, alpha = 255) => {
  const onlyValues = string.replace('rgb(', '').replace(')', '');
  const addedAlpha = onlyValues + ', ' + alpha;
  return addedAlpha.split(', ').map(x => +x);
};

export const getColor = (percent, alpha = 255, rgb = false) => {
  if (rgb) {
    return scalePercentToColor(percent);
  } else {
    return colorToArray(scalePercentToColor(percent), alpha);
  }
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

const fs = `
#define SHADER_NAME delayed-point-layer-fragment-shader
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform bool filled;
uniform float animationProgress;
varying vec4 vFillColor;
varying vec4 vLineColor;
varying vec2 unitPosition;
varying float innerUnitRadius;
varying float instanceAnimationProgress;
#ifndef PI
#define PI 3.141592653589793
#endif
// easing function
float backOut(float t) {
  float f = 1.0 - t;
  return 1.0 - (pow(f, 3.0) - f * sin(f * PI));
}
void main(void) {
  // delay is a value between 0 and 1 indicating how delayed it should be
  float t = instanceAnimationProgress;
  // divide by 0.75 to say how long it should increase size by
  // (size animation should be done at 75% through the animation, color anim continues)
  float tSize = backOut(clamp(t / 0.75, 0.0, 1.0));
  // our points actually render at half the size specified. This allows them
  // to exceed their desired size before settling into it without clipping.
  // In theory, we could modify the vertex shader to account for this, but
  // easiser to just supply a bigger radius for now...
  float maxSize = clamp(tSize * 0.5, 0.0, 1.0);
  float distToCenter = length(unitPosition);
  if (distToCenter > maxSize) { // @pbeshai edit - was 1.0
    discard;
  }
  if (distToCenter > innerUnitRadius) {
    gl_FragColor = vLineColor;
  } else if (filled) {
    gl_FragColor = vFillColor;
  } else {
    discard;
  }
  // use highlight color if this fragment belongs to the selected object.
  gl_FragColor = picking_filterHighlightColor(gl_FragColor);
  // use picking color if rendering to picking FBO.
  gl_FragColor = picking_filterPickingColor(gl_FragColor);
  // start at this color (white) and animate into the final color
  vec4 enterColor = vec4(0.07, 0.59, 0.8, 0);
  // t * t to use quadratic-ish easing
  gl_FragColor = mix(enterColor, gl_FragColor, t * t);
}
`;

export class DelayedPointLayer extends ScatterplotLayer {
  initializeState() {
    super.initializeState();
    this.getAttributeManager().addInstanced({
      instanceDelayFactor: {
        size: 1,
        accessor: 'getDelayFactor',
      },
    });
  }

  // override getShaders to inject into vertex shader and add a new fragment shader
  getShaders() {
    return Object.assign({}, super.getShaders(), {
      // inject: https://github.com/uber/luma.gl/blob/master/docs/api-reference/shadertools/assemble-shaders.md
      inject: {
        // inject at vertex shader (`vs`) declarations
        'vs:#decl': `
        attribute float instanceDelayFactor;
        uniform float animationProgress;
        uniform float numPoints;
        uniform float pointDuration;
        varying float instanceAnimationProgress;
        float delayedAnimationProgress(float instanceDelayFactor, float animationProgress, float pointDuration) {
          float delayProportion = 1.0 - pointDuration;
          float delay = instanceDelayFactor * delayProportion;
          // instanceDelayFactor = 0 => animationProgress: 0 to (1 - delayProportion) ===> 0 to 1
          // instanceDelayFactor = 1 => animationProgress: delayProportion to 1 ===> 0 to 1
          return clamp((animationProgress - delay) / pointDuration, 0.0, 1.0);
        }
        `,

        // inject at vertex shader (`vs`) end of function
        'vs:#main-end': `
        instanceAnimationProgress = delayedAnimationProgress(instanceDelayFactor, animationProgress, pointDuration);
        `,
      },
      // add new fragment shader (`fs`)
      fs,
    });
  }

  // override draw fucntion
  draw(opts) {
    // pointDuration = proportion of animation that is used to animate an individual (value between 0 and 1 where 1 is full duration)
    // animationProgress = how far through the animation we are (value between 0 and 1)
    const { animationProgress = 0.0, pointDuration = 0.25, data } = this.props;

    // add uniforms
    const uniforms = Object.assign({}, opts.uniforms, {
      animationProgress,
      pointDuration,
      numPoints: data.length,
    });
    super.draw(Object.assign({}, opts, { uniforms }));
  }
}

const defaultProps = {
  // when a given point begins animating (value between 0 and 1)
  // 0 = the first point to animate, 1 = the last point to animate
  // the last point begins animating when animationProgress = 1 - pointDuration.
  getDelayFactor: { type: 'accessor', value: 0.0 },
};

DelayedPointLayer.defaultProps = Object.assign(
  {},
  ScatterplotLayer.defaultProps,
  defaultProps
);
