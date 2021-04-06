import React, { useEffect, useState, useContext } from 'react';
import * as s from './style.module.less';
import cN from 'classnames';

import { MunicipalityMap } from '../MunicipalityMap';
import { SearchPlaces } from '../../Forms/SearchPlaces';
import { SectionInner } from '../../Layout/Sections';
import { CampainVisualisation } from '../../CampaignVisualisations';
import SignUp from '../../Forms/SignUp';
import { getStringFromPlaceholderText } from '../../utils';

import { MunicipalityContext } from '../../../context/Municipality';

const ColumnQualifying = ({
  municipality,
  handlePlaceSelect,
  displayTitle,
  mapDataReady,
}) => {
  const {
    singleMunicipalityStats: municipalityStats,
    singleMunicipalityStatsState: municipalityStatsState,
  } = useContext(MunicipalityContext);

  return (
    <>
      <SearchPlaces
        placeholder={!!municipality ? municipality.name : 'Gemeinde'}
        label={false}
        onPlaceSelect={handlePlaceSelect}
        showButton={false}
        inputSize="SMALL"
        buttonSize="MEDIUM"
      />
      <h2 className={s.headline}>{displayTitle}</h2>

      {!!municipality && municipalityStatsState === 'success' && mapDataReady && (
        <>
          <CampainVisualisation
            goal={municipalityStats.goal}
            count={municipalityStats.signups}
            // showCTA={visualisations.length !== 1 && visualisation.ctaLink}
            labels={{
              NEEDED: () => <>Benötigte Anmeldungen</>,
              GOAL_INBETWEEN_TOOLTIP: count => (
                <>
                  Insgesamt benötigt:
                  <br />
                  {count} Anmeldungen
                </>
              ),
              GOAL_INBETWEEN: count => <>Nächstes Ziel: {count} Anmeldungen</>,
              CURRENT_COUNT: () => <>Anmeldungen</>,
              CTA: () => <>Mitmachen</>,
            }}
            currency="Anmeldungen"
            startDate={new Date()}
          />
          {municipalityStats.signups > 0 ? (
            <p>
              {municipalityStats.signups === 1
                ? 'eine Anmeldung '
                : `${municipalityStats.signups?.toLocaleString(
                  'de'
                )} Anmeldungen `}
              {municipality ? `in ${municipality.name}` : ''}!{' '}
            </p>
          ) : (
            <p>
              Leider noch keine Anmeldungen{' '}
              {municipality ? `in ${municipality.name}` : ''}!{' '}
            </p>
          )}
        </>
      )}
    </>
  );
};

const BodyQualifying = ({ municipality, displayBody }) => {
  return (
    <div>
      <p>{displayBody}</p>
      <div className={s.adjustFinallyMessage}>
        <SignUp
          AuthenticatedDialog="municipality"
          // fields={['username', 'email']}
          forMunicipality={municipality ? municipality : true}
        />
      </div>
    </div>
  );
};

const ColumnCollecting = ({
  municipality,
  type,
  handlePlaceSelect,
  displayTitle,
}) => {
  return (
    <>
      <h2 className={s.headline}>{displayTitle}</h2>
      <SearchPlaces
        placeholder={!!municipality ? municipality.name : 'Gemeinde'}
        label={false}
        onPlaceSelect={handlePlaceSelect}
        showButton={true}
        inputSize="SMALL"
        buttonSize="MEDIUM"
      />
    </>
  );
};

const ColumnState = ({
  municipality,
  type,
  handlePlaceSelect,
  displayTitle,
}) => {
  return (
    <>
      <h2 className={s.headline}>{displayTitle}</h2>
      <SearchPlaces
        placeholder={!!municipality ? municipality.name : 'Gemeinde'}
        label={false}
        onPlaceSelect={handlePlaceSelect}
        showButton={true}
        inputSize="SMALL"
        buttonSize="MEDIUM"
      />
    </>
  );
};

const MapColumn = ({ municipality, setMapDataReady }) => {
  const [shouldStartAnimation, setShouldStartAnimation] = useState(false);

  let initialMapAnimation = true;
  if (typeof window !== `undefined`) {
    initialMapAnimation = !window.history?.state?.ags;
  }

  return (
    <div className={s.headerContainer}>
      <MunicipalityMap
        className={s.mapContainer}
        onDataReady={() => {
          setMapDataReady(true);
          setShouldStartAnimation(true);
        }}
        agsToFlyTo={!!municipality ? municipality.ags : undefined}
        flyToAgsOnLoad={true}
        shouldStartAnimation={shouldStartAnimation}
        initialMapAnimation={initialMapAnimation}
      />
    </div>
  );
};

const states = [
  {
    ags: '11000000',
    name: 'Berlin',
    coordinates: [13.405538, 52.51767],
    goal: 36000,
    population: 3644826,
  },
  {
    ags: '04011000',
    name: 'Bremen',
    coordinates: [8.809338, 53.075606],
    goal: 5500,
    population: 569352,
  },
  {
    ags: '02000000',
    name: 'Hamburg',
    coordinates: [9.99697, 53.550678],
    goal: 18000,
    population: 1841179,
  },
];

const agsCollecting = ['08121000'];

export const MunicipalityIntro = ({ pageContext, className, title, body }) => {
  const [mapDataReady, setMapDataReady] = useState(false);
  const [municipality, setMunicipality] = useState(pageContext.municipality);
  const [type, setType] = useState();

  useEffect(() => {
    if (municipality) {
      if (municipality.type) {
        setType(municipality.type);
      } else {
        const state = states.find(s => s.name === municipality.name);
        if (state) {
          setMunicipality(state);
          setType('state');
        }
        const collecting = agsCollecting.find(a => a === municipality.ags);
        if (collecting) {
          setType('collecting');
        }
        if (!state && !collecting) {
          setType('qualifying');
        }
      }
    } else {
      const { slug } = pageContext;
      if (slug === 'gemeinden') {
        setType('qualifying');
      } else if (slug === 'gemeinden-sammelphase') {
        setType('collecting');
      } else {
        setType('state');
        const state = states.find(s => s.slug === municipality.slug);
        if (state) {
          setMunicipality(state);
        }
      }
    }
  }, [municipality]);

  const [displayTitle, setDisplayTitle] = useState(
    getStringFromPlaceholderText(title, municipality)
  );
  useEffect(() => {
    setDisplayTitle(getStringFromPlaceholderText(title, municipality));
  }, [municipality]);

  const [displayBody, setDisplayBody] = useState(
    getStringFromPlaceholderText(body, municipality)
  );
  useEffect(() => {
    setDisplayBody(getStringFromPlaceholderText(body, municipality));
  }, [municipality]);

  // For navigating

  const adjustDocumentTitle = (municipality, replacement) => {
    if (municipality?.name) {
      document.title = document.title = document.title.replace(
        municipality.name,
        replacement
      );
    } else {
      document.title = document.title.replace(
        'in deine Gemeinde',
        `nach ${replacement}`
      );
    }
  };

  // Note: Opportunity for further improvement for navigating back in the browser:
  // Replace the history state, so it’s available
  // Currently not possible since it stops the animation
  // useEffect(() => {
  //   if (typeof window !== `undefined`) {
  //     if (window.history && window.history.replaceState) {
  //       window.history.replaceState(municipality, '');
  //     }
  //     console.log(window.history.state);
  //   }
  // }, []);

  useEffect(() => {
    if (typeof window !== `undefined`) {
      window.onpopstate = event => {
        if (event.state?.name) {
          setMunicipality(event.state);
          adjustDocumentTitle(municipality, event.state.name);
        }
      };
    }
    return () => {
      if (typeof window !== `undefined`) {
        window.onpopstate = () => { };
      }
    };
  }, [municipality]);

  const municipalityContext = useContext(MunicipalityContext);

  const handlePlaceSelect = selected => {
    if (selected) {
      municipalityContext.setMunicipality(selected);
      setMunicipality(selected);
    }
  };
  // const handlePlaceSelect = useCallback(
  //   selected => {
  //     if (selected) {
  //       setMunicipality(selected);
  //       municipalityContext.setMunicipality(selected);

  //       // Note: IE would need an additional fallback for window.history here:
  //       if (typeof window !== `undefined`) {
  //         if (window.history?.pushState) {
  //           window.history.pushState(
  //             selected,
  //             null,
  //             `${window.location.origin}/gemeinden/${selected.ags}`
  //           );
  //           adjustDocumentTitle(municipality, selected.name);
  //           setWindowLocationOriginForIE();
  //         } else {
  //           navigate(municipality.slug);
  //         }
  //       }
  //     }
  //   },
  //   [municipality]
  // );

  const columnProps = {
    municipality,
    type,
    handlePlaceSelect,
    displayTitle,
    mapDataReady,
    setMapDataReady,
  };
  return (
    <div className={cN(className, s.mapSection)}>
      <div className={s.twoColumnContainer}>
        <div className={s.twoColumnItem}>
          <MapColumn
            municipality={municipality}
            setMapDataReady={setMapDataReady}
          />
        </div>
        <div className={s.twoColumnItem}>
          <div className={s.rightColumnContainer}>
            <SectionInner>
              {type === 'qualifying' && <ColumnQualifying {...columnProps} />}
              {type === 'collecting' && <ColumnCollecting {...columnProps} />}
              {type === 'state' && <ColumnState {...columnProps} />}
            </SectionInner>
          </div>
        </div>
      </div>
      <div className={s.sectionBody}>
        <SectionInner>
          <BodyQualifying
            municipality={municipality}
            displayBody={displayBody}
          />
        </SectionInner>
      </div>
    </div>
  );
};
