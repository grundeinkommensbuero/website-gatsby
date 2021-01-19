import React, { useCallback, useEffect, useMemo, useState } from 'react';
import s from './style.module.less';
import cN from 'classnames';

import characterSet from './data/characterSet.json';
import labels from './data/labels.json';

import DeckGL from '@deck.gl/react';
import {
  GeoJsonLayer,
  ScatterplotLayer /* IconLayer */,
  TextLayer,
} from '@deck.gl/layers';
import { FlyToInterpolator } from '@deck.gl/core';
// Note: Neded for IconLayer / Pins
// import iconAtlas from './assets/pins_512.png';
import GL from '@luma.gl/constants';

import { scaleSqrt, scaleLinear } from 'd3-scale';
import { extent } from 'd3-array';

import along from '@turf/along';
import { lineString } from '@turf/helpers';

import {
  getLayeredData,
  getColor,
  zoomToBounds,
  DelayedPointLayer,
} from './utils';
import { detectWebGLContext } from '../../utils';
import { animate } from './animate';

import { MapTooltip } from './MapTooltip';
import { Button } from '../../Forms/Button';

import { useGetMunicipalityStats } from '../../../hooks/Api/Municipalities';

const legendSize = require('!svg-inline-loader!./assets/legend-size.svg');
const legendMarker = require('!svg-inline-loader!./assets/legend-marker.svg');
const legendGradient = require('!svg-inline-loader!./assets/legend-gradient.svg');

// ---- Constants ------------------------------------------------------------------------
const maxZoom = 9;
const zoomPadding = { padding: 10 };
// Note: only needed if IconLayers / Pins are used
// const iconMapping = {
//   marker: {
//     x: 0,
//     y: 0,
//     anchorX: 256,
//     anchorY: 512,
//     width: 512,
//     height: 512,
//     mask: true,
//   },
//   win: {
//     x: 1024,
//     y: 0,
//     anchorX: 256,
//     anchorY: 512,
//     width: 512,
//     height: 512,
//     mask: true,
//   },
// };

const Legend = () => {
  const [isActive, setIsActive] = useState(false);
  return (
    <div className={s.legendContainer}>
      <Button
        size={'SMALL'}
        className={s.legendButton}
        aria-label="Legende öffnen"
        onClick={() => {
          setIsActive(true);
        }}
      >
        Legende
      </Button>

      {isActive && (
        <div
          className={s.legendOverlay}
          role="dialog"
          aria-describedby="dialogTitle"
        >
          <button
            className={s.closeButton}
            onClick={() => setIsActive(false)}
            aria-label="Legende schließen"
          ></button>
          <div className={s.legendContent}>
            {/* <div className={s.legendLabel}>Legende</div> */}
            <div className={s.legendHeadline}>
              Jede Stadt oder Gemeinde mit Anmeldungen hat einen Kreis.
            </div>
            <p className={s.legendIconLabel}>
              Die Größe der Kreise entspricht der Anzahl der Anmeldungen:
            </p>
            <div className={s.legendIcon}>
              <div dangerouslySetInnerHTML={{ __html: legendSize }}></div>
              <span> mehr</span>
            </div>
            {/* <p className={s.legendIconLabel}>
              Wird das Anmeldeziel erreicht, bekommt der Pin einen Stern:
            </p>
            <div className={s.legendIcon}>
              <div dangerouslySetInnerHTML={{ __html: legendMarker }}></div>
              <span> geschafft!</span>
            </div> */}
            <p className={s.legendIconLabel}>
              Die Farbe der Kreise zeigt, wie viel Prozent des Anmeldeziels
              erreicht wurden:
            </p>
            <div className={s.legendIcon}>
              <div
                className={s.legendGradient}
                dangerouslySetInnerHTML={{ __html: legendGradient }}
              ></div>
            </div>
            <div className={s.legendSpacer}></div>
          </div>
        </div>
      )}
    </div>
  );
};

export const MunicipalityMap = ({
  agsToFlyTo,
  shouldStartAnimation,
  onDataReady,
  initialMapAnimation = true,
  flyToAgsOnLoad = true,
  className = s.defaultHeightContainer,
}) => {
  // ---- useState -------------------------------------------------------------------------
  const [dataStates, setDataStates] = useState([]);
  const [dataMunicipalities, setDataMunicipalities] = useState([]);
  const [dataSignups, setDataSignups] = useState([]);
  const [dataLabels, setDataLabels] = useState([]);
  const [dataEvents, setDataEvents] = useState([]);
  const [signupScale, setSignupScale] = useState([
    [1, 40000],
    [1000, 30000],
  ]);
  const [, setTimePassed] = useState();
  const [, municipalityStats, getMunicipalityStats] = useGetMunicipalityStats();
  // const [municipalityStats, setMunicipalityStats] = useState();
  const [focus, setFocus] = useState();
  const [mapDataReady, setMapDataReady] = useState(false);
  const [zoom, setZoom] = useState(4.56);
  const [zoomMin, setZoomMin] = useState(Infinity);
  const [fadeOpacities, setFadeOpacities] = useState({
    fallback: 1,
    map: 0,
    animatedMarkers: 0,
  });
  // WebGL
  const [hasWebGl, setHasWebGL] = useState(null);

  const [municipalityFadeProgress, setMunicipalityFadeProgress] = useState(
    initialMapAnimation ? 0 : 1
  );

  const [hoverInfo, setHoverInfo] = useState();

  useEffect(() => {
    setHasWebGL(detectWebGLContext());
  }, []);

  useEffect(() => {
    // import('./data/response.json').then(({ default: stats }) => {
    //   setMunicipalityStats(stats);
    // });
    getMunicipalityStats();
  }, []);

  useEffect(() => {
    if (municipalityStats?.municipalities) {
      import('./data/states-geo.json').then(({ default: states }) => {
        setDataStates(states);
      });

      import('./data/municipalitiesForMap.json').then(
        ({ default: municipalities }) => {
          const {
            municipalities: signups,
            events,
            scale,
            timePassed,
          } = municipalityStats;
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
            initialMapAnimation,
          });

          setDataSignups(dataSignups);
          setDataEvents(dataEvents);
          setDataLabels(dataLabels);
          // TODO: uncomment for production
          // setSignupScale(scale);
          setDataMunicipalities(dataMunicipalities);
          setTimePassed(timePassed);
          setMapDataReady(true);
        }
      );
    }
  }, [municipalityStats]);

  useEffect(() => {
    if (mapDataReady) {
      onDataReady();
    }
  }, [mapDataReady]);

  // ---- Utils ----------------------------------------------------------------------------
  const getAgsData = useCallback(
    ags => {
      const data = dataMunicipalities.find(m => m.ags === ags);
      return data;
    },
    [dataMunicipalities]
  );

  const updateFocus = useCallback(
    (ags = agsToFlyTo) => {
      const focusData = ags && getAgsData(ags);

      if (focusData) {
        setDataLabels([...dataLabels, focusData]);
        setFocus(focusData);
      }
    },
    [agsToFlyTo, getAgsData, dataLabels]
  );

  // ---- useEffects -----------------------------------------------------------------------
  useEffect(() => {
    // console.log(mapDataReady, shouldStartAnimation);

    if (mapDataReady && shouldStartAnimation) {
      animate({
        fadeOpacities,
        setFadeOpacities,
        dataEvents,
        setDataEvents,
        flyToAgsOnLoad,
        updateFocus,
        initialMapAnimation,
        setMunicipalityFadeProgress,
      });
    }
  }, [shouldStartAnimation, mapDataReady, animate]);

  useEffect(() => {
    if (mapDataReady) {
      updateFocus(agsToFlyTo);
    }
  }, [agsToFlyTo]);

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
      <div className={cN(s.defaultPositionRelative, className)}>
        <div className={s.interfaceContainer}>
          <div className={s.mapFallback}></div>
        </div>
      </div>
    );
  }

  return (
    <div className={cN(s.defaultPositionRelative, className)}>
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
            municipalityFadeProgress={municipalityFadeProgress}
            setHoverInfo={setHoverInfo}
            initialMapAnimation={initialMapAnimation}
            fadeOpacities={fadeOpacities}
          />
        </div>
      </div>
      {hoverInfo && hoverInfo.object && (
        <MapTooltip hoverInfo={hoverInfo} getColor={getColor} />
      )}
      <Legend />
    </div>
  );
};

const getCorrectedPositionRadius = (position, radius) => {
  // https://turfjs.org/docs/#along
  return along(
    lineString([position, [position[0], position[1] - 10]]),
    // second 0.5 equals radiusScale in this case
    Math.max(0, radius / 1000),
    { units: 'kilometers' }
  ).geometry.coordinates;
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
  municipalityFadeProgress,
  setHoverInfo,
  initialMapAnimation,
  fadeOpacities,
}) => {
  const signupAnimationDelayScale = scaleLinear()
    .domain(extent(dataSignups, d => d.population))
    .range([1, 0]);
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
    return new DelayedPointLayer({
      id: 'permanentMarker',
      data: dataSignups,
      pickable: true,
      getPosition: d => d.coordinates,
      radiusUnits: 'meters',
      radiusScale: 2,
      getRadius: d => scaleSignupsToMeters(d.signups),
      getFillColor: d => getColor(d.percentToGoal),
      onHover: info => setHoverInfo(info),
      animationProgress: municipalityFadeProgress,
      getDelayFactor: d => {
        return signupAnimationDelayScale(d.population);
      },
      parameters: {
        // prevent flicker from z-fighting
        [GL.DEPTH_TEST]: false,
      },
    });
  }, [
    dataSignups,
    scaleSignupsToMeters,
    getColor,
    signupAnimationDelayScale,
    municipalityFadeProgress,
  ]);

  // Important note: this is the implementation if you want to switch to Icons / Pins

  // const layerAnimatedMarker = useMemo(() => {
  //   return new IconLayer({
  //     id: 'animatedMarker',
  //     data: dataEvents,
  //     pickable: true,
  //     iconAtlas,
  //     iconMapping,
  //     // getIcon: return a key of icon mapping as string
  //     getIcon: d => (d.signups > d.goal ? 'win' : 'marker'),
  //     getPosition: d => [d.longitude, d.latitude],
  //     sizeUnits: 'meters',
  //     getSize: d => scaleSignupsToMeters(d.signups),
  //     getColor: d => getColor(d.percentToGoal),
  //     onHover: info => setHoverInfo(info),
  //   });
  // }, [dataEvents]);

  const layerAnimatedMarker = useMemo(() => {
    return new ScatterplotLayer({
      id: 'animatedMarker',
      data: dataEvents,
      pickable: true,
      opacity: fadeOpacities.animatedMarkers,
      getPosition: d => [d.longitude, d.latitude],
      radiusUnits: 'meters',
      radiusScale: 1,
      getRadius: d => scaleSignupsToMeters(d.signups),
      getFillColor: d => getColor(d.percentToGoal),
      onHover: info => setHoverInfo(info),
    });
  }, [dataEvents, fadeOpacities]);

  const layerPermanentLabels = useMemo(() => {
    return new TextLayer({
      id: 'permanentLabel',
      data: dataLabels,
      // opacity: 0.7,
      // Only characters of this array will be rendered,
      // default does not include German alphabet
      characterSet,
      pickable: false,
      getPosition: d =>
        getCorrectedPositionRadius(
          d.coordinates,
          scaleSignupsToMeters(d.signups)
        ),
      getText: d => d.name,
      backgroundColor: [255, 255, 255],
      getColor: d => getColor(d.percentToGoal, 230),
      getSize: 40000, // 30000 meters
      sizeMinPixels: 12,
      sizeMaxPixels: 20,
      sizeUnits: 'meters',
      getAngle: 0,
      fontFamily: 'Ideal, Tahoma, sans-serif',
      fontWeight: '900',
      getTextAnchor: 'middle',
      getAlignmentBaseline: 'top',
    });
  }, [dataLabels]);

  const layerAnimatedLabels = useMemo(() => {
    return new TextLayer({
      id: 'animatedLabels',
      data: dataEvents.filter(x => x.hasLabel === true),
      characterSet,
      pickable: false,
      getPosition: d =>
        getCorrectedPositionRadius(
          d.coordinates,
          scaleSignupsToMeters(d.signups)
        ),
      getText: d => d.name,
      backgroundColor: [255, 255, 255],
      getColor: d => getColor(d.percentToGoal, 230),
      getSize: 40000, // 30000 meters
      sizeMinPixels: 12,
      sizeMaxPixels: 20,
      sizeUnits: 'meters',
      getAngle: 0,
      fontFamily: 'Ideal, Tahoma, sans-serif',
      fontWeight: '900',
      getTextAnchor: 'middle',
      getAlignmentBaseline: 'top',
    });
  }, [dataEvents]);

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

  // ---- useEffects -----------------------------------------------------------------------

  useEffect(() => {
    if (dataEvents.length > 0) {
      setLayers([
        layerStates,
        layerAnimatedMarker,
        layerPermanentMarker,
        layerPermanentLabels,
        layerAnimatedLabels,
      ]);
    }
  }, [dataLabels, dataEvents, municipalityFadeProgress, fadeOpacities]);

  useEffect(() => {
    if (focus) {
      const { longitude, latitude } = focus;
      flyTo({
        longitude,
        latitude,
        transitionDuration: initialMapAnimation ? 2000 : 1000,
      });
    }
  }, [focus, initialMapAnimation]);

  useEffect(() => {
    setInitialViewState(prev => ({
      ...prev,
      zoom,
      transitionDuration: 300,
    }));
  }, [zoom]);

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
      ></DeckGL>
    </>
  );
};
