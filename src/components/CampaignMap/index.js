import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import s from './style.module.less';

import characterSet from './data/characterSet.json';
import labels from './data/labels.json';

import DeckGL from '@deck.gl/react';
import { IconLayer, GeoJsonLayer, TextLayer } from '@deck.gl/layers';
import { FlyToInterpolator, OrthographicView } from '@deck.gl/core';
import iconAtlas from './assets/pins_512.png';
import { scaleSqrt } from 'd3-scale';

import { getLayeredData, getColor, zoomToBounds } from './utils';
import { animate } from './animate';

console.time('timeToMountMap');

// ---- Constants ------------------------------------------------------------------------
const maxZoom = 9;
const zoomPadding = { padding: 10 };
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

export const CampaignMap = ({
  AgsToFlyTo,
  animateOnLoad = true,
  flyToAgsOnLoad = false,
  className = s.heightSetter,
}) => {
  const [hasWebGl, setHasWebGL] = useState(null);
  useEffect(() => {
    setHasWebGL(detectWebGLContext());
  }, []);

  // ---- useState -------------------------------------------------------------------------
  const [dataStates, setDataStates] = useState([]);
  const [dataMunicipalities, setDataMunicipalities] = useState([]);
  const [dataSignups, setDataSignups] = useState([]);
  const [dataLabels, setDataLabels] = useState([]);
  const [dataEvents, setDataEvents] = useState([]);
  const [signupScale, setSignupScale] = useState([
    [1, 40000],
    [2000, 80000],
  ]);
  const [timePassed, setTimePassed] = useState();
  const [focus, setFocus] = useState();
  const [mapReady, setMapReady] = useState(false);
  const [zoom, setZoom] = useState(4.56);
  const [zoomMin, setZoomMin] = useState(Infinity);
  const [fadeOpacities, setFadeOpacities] = useState({
    fallback: 1,
    map: 0,
  });

  // ---- Data -----------------------------------------------------------------------------
  useLayoutEffect(() => {
    import('./data/states-geo.json').then(({ default: states }) => {
      setDataStates(states);
    });

    const municipalities = import('./data/municipalities.json');
    const response = import('./data/response.json');
    Promise.all([municipalities, response]).then(modules => {
      const [{ default: municipalities }, { default: response }] = modules;
      const { municipalities: signups, events, scale, timePassed } = response;
      const {
        dataSignups,
        dataEvents,
        dataLabels,
        dataMunicipalities,
      } = getLayeredData({
        municipalities,
        signups,
        events,
        labels,
        animateOnLoad,
      });
      setDataSignups(dataSignups);
      setDataEvents(dataEvents);
      setDataLabels(dataLabels);
      setSignupScale(scale);
      setDataMunicipalities(dataMunicipalities);
      setTimePassed(timePassed);
      setMapReady(true);
    });
  }, []);
  // ---- Utils ----------------------------------------------------------------------------
  const getAgsData = useCallback(
    ags => {
      const data = dataMunicipalities.find(m => m.ags === ags);
      return data;
    },
    [dataMunicipalities]
  );

  const updateFocus = useCallback(
    (ags = AgsToFlyTo) => {
      // console.log(ags);
      const focusData = ags && getAgsData(ags);

      if (focusData) {
        setDataLabels([...dataLabels, focusData]);
        setFocus(focusData);
      }
    },
    [AgsToFlyTo, getAgsData, dataLabels]
  );

  // ---- useEffects -----------------------------------------------------------------------
  useEffect(() => {
    if (mapReady) {
      animate({
        fadeOpacities,
        setFadeOpacities,
        dataEvents,
        setDataEvents,
        flyToAgsOnLoad,
        updateFocus,
        animateOnLoad,
      });
    }
  }, [mapReady, animate]);

  useEffect(() => {
    if (mapReady) {
      updateFocus(AgsToFlyTo);
    }
  }, [AgsToFlyTo]);

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

  if (!hasWebGl) {
    return (
      <div className={className}>
        <div className={s.interfaceContainer}>
          <div className={s.mapFallback}></div>
        </div>
      </div>
    );
  }

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

        <div
          className={s.mapFallback}
          style={{ opacity: fadeOpacities.fallback }}
        ></div>
        <div className={s.mapContainer} style={{ opacity: fadeOpacities.map }}>
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
          />
        </div>
      </div>
    </div>
  );
};

const Tooltip = ({ hoverInfo }) => {
  return (
    <div
      className={s.tooltipContainer}
      style={{
        background: getColor(hoverInfo.object.percentToGoal, 255, true),
        left: hoverInfo.x,
        top: hoverInfo.y,
        color: 'rgba(255,255,255,0.9)',
      }}
    >
      <div className={s.tooltipHeader}>
        <span className={s.tooltipMunicipality}>{hoverInfo.object.name}</span>
      </div>
      <div className={s.tooltipInfoContainer}>
        <div className={s.tooltipInfo}>
          <span className={s.tooltipNumber}>
            {hoverInfo.object.percentToGoal} %
          </span>
          <span className={s.tooltipLabel}> der nötigen Anmeldungen</span>
        </div>
        <div className={s.tooltipInfo}>
          <span className={s.tooltipNumber}>{hoverInfo.object.signups}</span>
          <span className={s.tooltipLabel}> Anmeldungen insgesamt</span>
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
}) => {
  // ---- Utils ----------------------------------------------------------------------------
  const [signupDomain, signupRange] = signupScale;
  const scaleSignupsToMeters = scaleSqrt()
    .domain(signupDomain)
    .range(signupRange);

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
      getLineColor: [248, 246, 255], // @pink bright
      getLineWidth: 2,
      filled: true,
      getFillColor: [236, 234, 247], // @pink light
    });
  }, [dataStates]);

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
      onHover: info => setHoverInfo(info),
    });
  }, [dataSignups, scaleSignupsToMeters, getColor]);

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
      onHover: info => setHoverInfo(info),
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
      getSize: 40000, // 30000 meters
      sizeMinPixels: 11,
      sizeMaxPixels: 18,
      sizeUnits: 'meters',
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

  const [dimensions, setDimensions] = useState();
  const [zoomBounds, setZoomBounds] = useState([
    [5.9, 55],
    [15, 47.3],
  ]);

  // NOTE: possible refactor to limit bounds after multiple resizes
  // 1. Keep max dimensions in state
  // 2. and adjust minZoom when the maxdimensions change
  const [touched, setTouched] = useState(false);
  const [controllerOptions, setControllerOptions] = useState({
    dragRotate: false,
    scrollZoom: true,
    touchRotate: false,
  });

  const [hoverInfo, setHoverInfo] = useState();

  // ---- useEffects -----------------------------------------------------------------------
  useEffect(() => {
    if (dataEvents.length > 0) {
      setLayers([
        layerStates,
        layerPermanentMarker,
        layerAnimatedMarker,
        layerPermanentLabels,
      ]);
    }
  }, [dataLabels, dataEvents]);

  useEffect(() => {
    if (focus) {
      const { longitude, latitude } = focus;
      flyTo({ longitude, latitude });
    }
  }, [focus]);

  useEffect(() => {
    setInitialViewState(prev => ({
      ...prev,
      zoom,
      transitionDuration: 300,
    }));
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
    // NOTE: viewState gives even more control,
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

  // ---- Template -------------------------------------------------------------------------
  return (
    <>
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
      >
        {hoverInfo && hoverInfo.object && <Tooltip hoverInfo={hoverInfo} />}
      </DeckGL>
      {/* <Legend /> */}
    </>
  );
};

function detectWebGLContext() {
  // Create canvas element. The canvas is not added to the
  // document itself, so it is never displayed in the
  // browser window.
  if (typeof window !== `undefined`) {
    var canvas = document.createElement('canvas');
    // Get WebGLRenderingContext from canvas element.
    var gl =
      canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    // Report the result.
    if (gl && gl instanceof WebGLRenderingContext) {
      return true;
    } else {
      return false;
    }
  }
  return false;
}
