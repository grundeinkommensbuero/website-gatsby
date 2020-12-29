import React, { useEffect, useState } from 'react';
import s from './style.module.less';
import cN from 'classnames';

import { MunicipalityMap } from '../MunicipalityMap';
import { SearchPlaces } from '../../Forms/SearchPlaces';
import { SectionInner } from '../../Layout/Sections';
import { CampainVisualisation } from '../../CampaignVisualisations';
import SignUp from '../../Forms/SignUp';
import { getStringFromPlaceholderText } from '../../utils';

import { useGetMunicipalityStats } from '../../../hooks/Api/Municipalities';

const ColumnQualifying = ({
  municipality,
  handlePlaceSelect,
  displayTitle,
  mapDataReady,
}) => {
  const [
    municipalityStatsState,
    municipalityStats,
    /* getMunicipalityStats, */
  ] = useGetMunicipalityStats();
  useEffect(() => {
    // getMunicipalityStats(municipality.ags);
  }, []);
  // console.log(municipalityStats);
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
          <p>
            Schon {municipalityStats.signups?.toLocaleString('de')} Anmeldungen
            in {municipality.name}!{' '}
          </p>
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
  return (
    <div className={s.headerContainer}>
      <MunicipalityMap
        className={s.mapContainer}
        AgsToFlyTo={!!municipality ? municipality.ags : undefined}
        onDataReady={() => {
          setMapDataReady(true);
          setShouldStartAnimation(true);
        }}
        shouldStartAnimation={true}
        animateEvents={true}
        flyToAgsOnLoad={true}
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
  // const [shouldStartAnimation, setShouldStartAnimation] = useState(false);
  const { slug } = pageContext;
  let { municipality } = pageContext;
  let type = municipality?.type;

  if (slug === 'gemeinden') {
    type = 'qualifying';
  } else if (slug === 'gemeinden-sammelphase') {
    type = 'collecting';
  } else {
    const state = states.find(s => s.slug === slug);
    type = 'state';
    municipality = state;
  }

  let displayTitle = getStringFromPlaceholderText(title, municipality);
  let displayBody = getStringFromPlaceholderText(body, municipality);

  const [, setAgs] = useState();
  const handlePlaceSelect = municipality => {
    if (municipality) {
      setAgs(municipality.ags);
    } else {
      setAgs();
    }
  };

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
            // shouldStartAnimation={shouldStartAnimation}
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
