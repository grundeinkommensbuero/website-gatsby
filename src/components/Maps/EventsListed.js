import React from 'react';
import * as s from './style.module.less';
import * as dsm from './utils/dateStringManipulation';
import { LoadingAnimation } from '../LoadingAnimation';

export const EventsListed = ({ locationsFiltered }) => {
  let groupedEvents = {};
  let locationsSorted = [];

  const groupByDate = locations => {
    locations.forEach(location => {
      const eventDate = dsm.getGermanDateFormat(location.startTime);
      if (!(eventDate in groupedEvents)) groupedEvents[eventDate] = [];
      groupedEvents[eventDate].push(location);
    });
  };

  if (locationsFiltered) {
    locationsSorted = locationsFiltered
      ?.filter(location => location.startTime && location.endTime)
      .sort(function (a, b) {
        return new Date(a.startTime) - new Date(b.startTime);
      });
    groupByDate(locationsSorted);
  }

  return (
    <>
      {Object.keys(groupedEvents).length > 0 ? (
        <>
          <h2 className={s.moduleHeading}>Komm zu einer Sammelaktion</h2>
          <div className={s.eventContainer}>
            {Object.keys(groupedEvents).map(key => {
              return (
                <div key={key} className={s.eventDay}>
                  <h3 className={s.descriptionHeading}>
                    {dsm.getDateWithWeekday(groupedEvents[key][0].startTime)}
                  </h3>
                  {groupedEvents[key].map((event, index) => {
                    return (
                      <div key={index} className={s.eventDescription}>
                        <p className={s.descriptionText}>{event.description}</p>
                        <b>
                          {dsm.localeTime(event.startTime)}-
                          {dsm.localeTime(event.endTime)}
                          {' Uhr, '}
                          {event.address}
                        </b>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <LoadingAnimation />
      )}
    </>
  );
};
