import React, { useCallback, useEffect, useRef, useState } from 'react';
import s from './style.module.less';
import cN from 'classnames';

import { MunicipalityMap } from '../MunicipalityMap';
import { SearchPlaces } from '../../Forms/SearchPlaces';
import { SectionInner } from '../../Layout/Sections';
import { CampainVisualisation } from '../../CampaignVisualisations';
import SignUp from '../../Forms/SignUp';
import { getStringFromPlaceholderText } from '../../utils';

import { useGetMunicipalityStats } from '../../../hooks/Api/Municipalities';

import { setWindowLocationOriginForIE } from '../../utils/index';
import { navigate } from 'gatsby';

const ColumnQualifying = ({
  municipality,
  handlePlaceSelect,
  displayTitle,
  mapDataReady,
}) => {
  const [
    municipalityStatsState,
    municipalityStats,
    getMunicipalityStats,
  ] = useGetMunicipalityStats();

  useEffect(() => {
    if (municipality) {
      getMunicipalityStats(municipality.ags);
    }
  }, []);

  useEffect(() => {
    if (municipality) {
      getMunicipalityStats(municipality.ags);
    }
  }, [municipality]);

  return (
    <>
      <SearchPlaces
        placeholder={!!municipality ? municipality.name : 'Gemeinde'}
        label={false}
        onPlaceSelect={handlePlaceSelect}
        showButton={true}
        inputSize="SMALL"
        buttonSize="MEDIUM"
      />
      <h1 className={s.headline}>{displayTitle}</h1>

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
              in {municipality.name}!{' '}
            </p>
          ) : (
            <p>Leider noch keine Anmeldungen in {municipality.name}! </p>
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
      <h1 className={s.headline}>{displayTitle}</h1>
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
      <h1 className={s.headline}>{displayTitle}</h1>
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
  const initialMapAnimation = !window.history?.state?.ags;

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
  { ags: '11000000', slug: 'berlin', name: 'Berlin' },
  { ags: '04011000', slug: 'bremen', name: 'Bremen' },
  { ags: '02000000', slug: 'hamburg', name: 'Hamburg' },
];

export const MunicipalityIntro = ({ pageContext, className, title, body }) => {
  const [mapDataReady, setMapDataReady] = useState(false);
  const [municipality, setMunicipality] = useState(pageContext.municipality);

  // TODO: refactor to stateful:
  const { slug } = pageContext;
  let type = municipality?.type;

  if (slug === 'gemeinden') {
    type = 'qualifying';
  } else if (slug === 'gemeinden-sammelphase') {
    type = 'collecting';
  } else {
    type = 'state';
    if (!pageContext.municipality && !municipality) {
      const state = states.find(s => s.slug === slug);
      setMunicipality(state);
    }
  }

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
  useEffect(() => {
    window.onpopstate = event => {
      console.log({ event });

      if (event.state?.name) {
        setMunicipality(event.state);
        adjustDocumentTitle(municipality, event.state.name);
      }
    };
    return () => {
      window.onpopstate = () => {};
    };
  }, [municipality]);

  const handlePlaceSelect = useCallback(
    selected => {
      if (selected) {
        setMunicipality(selected);

        // TODO: Check if library for fallback for IE should be used here:
        if (window.history?.pushState) {
          window.history.pushState(
            selected,
            null,
            `${window.location.origin}/gemeinden/${selected.ags}`
          );
          adjustDocumentTitle(municipality, selected.name);
          setWindowLocationOriginForIE();
        } else {
          navigate(municipality.ags);
        }
      }
    },
    [municipality]
  );

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
