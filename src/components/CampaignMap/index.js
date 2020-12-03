import React, { useCallback, useEffect, useMemo, useState } from 'react';
import s from './style.module.less';

import characterSet from './data/characterSet.json';
import labels from './data/labels.json';

import DeckGL from '@deck.gl/react';
import { IconLayer, GeoJsonLayer, TextLayer } from '@deck.gl/layers';
import { FlyToInterpolator } from '@deck.gl/core';
import iconAtlas from './assets/pins_512.png';
import { scaleLinear, scaleSqrt } from 'd3-scale';

import {
  getMergedSignups,
  getMergedLabels,
  getMergedEvents,
  zoomToBounds,
} from './utils';

import { animate } from './animate';

console.time('timeToMountMap');

export const CampaignMap = ({
  focusAGS,
  initialAnimation = true,
  initialFly = false,
  className = s.heightSetter,
}) => {
  // ---- useState -------------------------------------------------------------------------
  const [dataStates, setDataStates] = useState([]);
  // const [dataMunicipalities, setDataMunicipalities] = useState([]);
  const [dataSignups, setDataSignups] = useState([]);
  const [dataLabels, setDataLabels] = useState([]);
  const [dataEvents, setDataEvents] = useState([]);
  const [signupScale, setSignupScale] = useState([
    // Scale everything below 1 to 0
    [0, 0.99, 1, 40000],
    [0, 0, 2000, 80000],
  ]);
  const [timePassed, setTimePassed] = useState();
  const [animationCounter, setAnimationCounter] = useState(0);
  const [focusAGSCounter, setFocusAGSCounter] = useState(0);
  const [focus, setFocus] = useState();
  const [zoom, setZoom] = useState(4.56);
  const [zoomMin, setZoomMin] = useState(Infinity);
  const [maxZoom, setMaxZoom] = useState(9);
  const [showFallback, setShowFallback] = useState(true);

  // ---- Data -----------------------------------------------------------------------------
  useEffect(() => {
    import('./data/states-geo.json').then(({ default: states }) => {
      setDataStates(states);
    });

    const municipalities = import('./data/municipalities.json');
    const response = import('./data/response.json');
    Promise.all([municipalities, response]).then(modules => {
      const [{ default: municipalities }, { default: response }] = modules;
      const { municipalities: signups, events, scale, timePassed } = response;
      console.time('timeToMergeData');
      setDataSignups(getMergedSignups({ municipalities, signups, events }));
      setDataLabels(getMergedLabels({ municipalities, labels, signups }));
      setDataEvents(getMergedEvents({ municipalities, events }));
      console.timeEnd('timeToMergeData');

      // Order is important here
      // to pass options to the controller
      setTimePassed(timePassed);
      setSignupScale(scale);
      // is this the right time?
    });
  }, []);

  // ---- Utils ----------------------------------------------------------------------------
  const getAGSData = ags => {
    let data = dataEvents.find(e => e.ags === ags);
    if (!data) {
      data = dataSignups.find(s => s.ags === ags);
    }
    return data;
  };

  const updateFocus = (ags = focusAGS) => {
    const focus = getAGSData(ags);
    if (focus) {
      setDataLabels([...dataLabels, focus]);
      setFocus(focus);
    }
  };

  // ---- Animation ------------------------------------------------------------------------
  useEffect(() => {
    // TODO: verify this is the best entry point for the animation
    // --> seems to work well, but needs an initial setTimeout
    if (dataEvents.length > 0 && animationCounter === 0) {
      console.timeEnd('timeToMountMap');
      setAnimationCounter(prev => prev + 1);
    }
  }, [dataEvents]);

  useEffect(() => {
    if (animationCounter === 1) {
      setTimeout(() => {
        // TODO: verify this is the right time to replace the fallback
        setShowFallback(false);

        animate({
          dataEvents,
          setDataEvents,
          initialFly,
          updateFocus,
        });
      }, 1200);
    } else {
      animate({
        dataEvents,
        setDataEvents,
        initialFly,
        updateFocus,
      });
    }
  }, [animationCounter]);

  // ---- useEffects -----------------------------------------------------------------------
  useEffect(() => {
    if (focusAGSCounter > 0) {
      updateFocus();
    }
    setFocusAGSCounter(focusAGSCounter + 1);
  }, [focusAGS]);

  // ---- Handlers -------------------------------------------------------------------------
  const handleZoomClick = change => {
    let updated = zoom + change;
    if (updated < zoomMin) {
      updated = zoomMin;
    }
    if (updated > maxZoom) {
      updated = maxZoom;
    }
    if (updated !== zoom) {
      setZoom(updated);
    }
  };

  // ---- Template -------------------------------------------------------------------------
  return (
    <div className={className}>
      <div className={s.interfaceContainer}>
        <div className={s.blockTouchOverlay}>
          <div className={s.top}></div>
          <div className={s.right}></div>
          <div className={s.left}></div>
          <div className={s.bottom}></div>
        </div>
        <div id="mapButtonContainer" className={s.buttonContainer}>
          <button
            className={s.mapButton}
            onClick={() => {
              handleZoomClick(1);
            }}
          >
            {/* Plus */}
            &#x2b;
          </button>
          <button
            className={s.mapButton}
            onClick={() => {
              handleZoomClick(-1);
            }}
          >
            {/* Minus */}
            &#x2212;
          </button>
        </div>

        {showFallback && <div className={s.mapFallback}></div>}
        <div className={s.mapContainer}>
          <Map
            dataStates={dataStates}
            dataSignups={dataSignups}
            dataLabels={dataLabels}
            dataEvents={dataEvents}
            signupScale={signupScale}
            focus={focus}
            zoom={zoom}
            setZoom={setZoom}
            zoomMin={zoomMin}
            setZoomMin={setZoomMin}
            maxZoom={maxZoom}
          />
        </div>
      </div>
    </div>
  );
};

const Map = ({
  dataStates,
  dataSignups,
  dataLabels,
  dataEvents,
  signupScale,
  focus,
  zoom,
  setZoom,
  zoomMin,
  setZoomMin,
  maxZoom,
}) => {
  // ---- Utils ----------------------------------------------------------------------------
  const [signupDomain, signupRange] = signupScale;
  const scaleSignupsToMeters = scaleSqrt()
    .domain(signupDomain)
    .range(signupRange);

  const scalePercentToColor = scaleLinear()
    .domain([0, 100])
    .range(['#00C8F0', '#43006a']);

  const colorToArray = (string, alpha = 255) => {
    const onlyValues = string.replace('rgb(', '').replace(')', '');
    const addedAlpha = onlyValues + ', ' + alpha;
    return addedAlpha.split(', ').map(x => +x);
  };

  const getColor = (percent, alpha = 255) => {
    return colorToArray(scalePercentToColor(percent), alpha);
  };

  const flyTo = useCallback(
    ({ longitude, latitude, zoom = 6.9, transitionDuration = 2000 }) => {
      setInitialViewState({
        longitude,
        latitude,
        zoom,
        pitch: 0,
        bearing: 0,
        transitionDuration,
        transitionInterpolator: new FlyToInterpolator(),
        transitionEasing: function easeInOutCubic(t) {
          return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        },
      });
    },
    []
  );

  // ---- Layers ---------------------------------------------------------------------------
  const layerStates = useMemo(() => {
    return new GeoJsonLayer({
      id: 'states',
      data: dataStates,
      pickable: false,
      stroked: true,
      lineWidthScale: 1,
      lineWidthMinPixels: 2,
      getLineColor: [255, 255, 255],
      getLineWidth: 2,
      filled: true,
      getFillColor: [240, 240, 240],
    });
  }, [dataStates]);

  const iconMapping = {
    marker: {
      x: 0,
      y: 0,
      anchorX: 256,
      anchorY: 512,
      width: 512,
      height: 512,
      mask: true,
    },
    win: {
      x: 1024,
      y: 0,
      anchorX: 256,
      anchorY: 512,
      width: 512,
      height: 512,
      mask: true,
    },
  };
  // useMemo(() => computeExpensiveValue(a, b), [a, b]);

  const layerPermanentMarker = useMemo(() => {
    return new IconLayer({
      id: 'permanentMarker',
      data: dataSignups,
      pickable: true,
      iconAtlas,
      iconMapping,
      // getIcon: return a key of icon mapping as string
      getIcon: d => (d.signups > d.goal ? 'win' : 'marker'),
      getPosition: d => d.coordinates,
      sizeUnits: 'meters',
      getSize: d => scaleSignupsToMeters(d.signups),
      getColor: d => getColor(d.percentToGoal),
    });
  }, [dataSignups, scaleSignupsToMeters]);

  const layerAnimatedMarker = useMemo(() => {
    return new IconLayer({
      id: 'animatedMarker',
      data: dataEvents,
      pickable: true,
      iconAtlas,
      iconMapping,
      // getIcon: return a key of icon mapping as string
      getIcon: d => (d.signups > d.goal ? 'win' : 'marker'),
      getPosition: d => [d.longitude, d.latitude],
      sizeUnits: 'meters',
      getSize: d => scaleSignupsToMeters(d.signups),
      getColor: d => getColor(d.percentToGoal),
      // updateTriggers: {
      //   getPosition: [dataEvents],
      // },
    });
  }, [dataEvents]);

  const layerPermanentLabels = useMemo(() => {
    return new TextLayer({
      id: 'permanentLabel',
      data: dataLabels,
      // opacity: 0.7,
      // Only characters of this array will be rendered,
      // default does not include German alphabet
      characterSet,
      pickable: false,
      getPosition: d => d.coordinates,
      getText: d => d.name,
      backgroundColor: [255, 255, 255],
      getColor: d => getColor(d.percentToGoal, 180),
      getSize: 20, // 30000 meters
      sizeMinPixels: 10,
      sizeMaxPixels: 20,
      sizeUnits: 'pixels',
      getAngle: 0,
      fontFamily: 'Ideal, Tahoma, sans-serif',
      fontWeight: '900',
      getTextAnchor: 'middle',
      getAlignmentBaseline: 'top',
    });
  }, [dataLabels]);

  // ---- useStates ------------------------------------------------------------------------
  const [layers, setLayers] = useState([]);

  const [initialViewState, setInitialViewState] = useState({
    altitude: 1.5,
    bearing: 0,
    latitude: 51.42,
    longitude: 10.34,
    pitch: 0,
    minPitch: 0,
    maxPitch: 0,
    zoom,
    minZoom: 4.5,
    maxZoom,
  });
  // Not in use because of controller options:
  // const [viewState, setViewState] = useState({
  //   ...initialViewState,
  // });

  const [dimensions, setDimensions] = useState();
  const [zoomBounds, setZoomBounds] = useState([
    [5.9, 55],
    [15, 47.3],
  ]);
  const [zoomPadding, setZoomPadding] = useState({ padding: 10 });
  // TODO: refactor to sizes –– only works without too many resizes right now
  // 1. Keep max dimensions in state
  // 2. and adjust minZoom when the maxdimensions change
  const [touched, setTouched] = useState(false);
  const [controllerOptions, setControllerOptions] = useState({
    dragRotate: false,
    scrollZoom: true,
    touchRotate: false,
  });

  // ---- useEffects -----------------------------------------------------------------------
  useEffect(() => {
    if (dataEvents.length > 0) {
      // console.log('setLayers effect');
      setLayers([
        layerStates,
        layerPermanentMarker,
        layerAnimatedMarker,
        layerPermanentLabels,
      ]);
    }
    // TODO: check dependencies
    // --> opinion: good for now
    // }, [dataStates, dataSignups, dataLabels, dataEvents]);
  }, [dataLabels, dataEvents]);

  useEffect(() => {
    if (focus) {
      // console.log(focus);
      const { longitude, latitude } = focus;
      flyTo({ longitude, latitude });
    }
  }, [focus]);

  useEffect(() => {
    setInitialViewState(prev => ({ ...prev, zoom, transitionDuration: 300 }));
  }, [zoom]);

  useEffect(() => {
    // if (dimensions) {
    // }
  }, [dimensions]);

  useEffect(() => {
    // console.log(initialViewState);
  }, [initialViewState]);

  // ---- Handlers -------------------------------------------------------------------------
  const handleViewState = ({ viewState }) => {
    setInitialViewState({
      ...viewState,
    });
    // viewState gives even more control,
    // but controller handling is
    // more complex
    // setViewState({
    //   ...viewState,
    // });
  };

  const handleResize = dimensionsUpdate => {
    // console.log('resized');
    setDimensions(dimensionsUpdate);
    zoomToBounds({
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
    });

    if (
      !dimensions ||
      (dimensions && dimensions.width !== dimensionsUpdate.width)
    ) {
      const isNarrow = dimensionsUpdate.width < 400;
      const scrollZoom = isNarrow ? false : true;
      // Suggestion: solve with a scrollable area
      // -->
      // const dragPan = isNarrow ? false : true;
      setControllerOptions({ ...controllerOptions, scrollZoom });
    }
  };

  const handleLoad = () => {
    // console.log('map loaded');
  };

  // ---- Controller -----------------------------------------------------------------------
  // let MyViewState;
  // class MyController extends Controller {
  //   constructor(options = {}) {
  //     super(MyViewState, options);
  //     this.events = ['pointermove'];
  //   }

  //   handleEvent(event) {
  //     if (event.type === 'pointermove') {
  //       console.log(event);
  //     } else {
  //       super.handleEvent(event);
  //     }
  //   }
  // }

  // ---- Template -------------------------------------------------------------------------
  return (
    <DeckGL
      initialViewState={initialViewState}
      // viewState={viewState}
      onViewStateChange={event => {
        const { viewState, interactionState } = event;
        handleViewState({ viewState });

        const { isZooming, isPanning } = interactionState;
        if (!touched && (isZooming || isPanning)) {
          setTouched(true);
        }
      }}
      controller={controllerOptions}
      layers={layers}
      onLoad={props => {
        handleLoad();
      }}
      onResize={dimensions => {
        handleResize(dimensions);
      }}
      // getTooltip={({ object }) =>
      //   object && `${object.name}\nEinwohner: ${object.population}`
      // }
    ></DeckGL>
  );
};
