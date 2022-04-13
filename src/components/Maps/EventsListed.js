import React, { useEffect, useState } from 'react';
import * as s from './style.module.less';
import * as dsm from './utils/dateStringManipulation';
import { LoadingAnimation } from '../LoadingAnimation';

/* The "EventsListed" Component should only display data,
when there were events in the next days.

Otherwise it renders nothing. */

export const EventsListed = ({ locationsFiltered }) => {
  const [loading, setLoading] = useState(false);
  const [groupedEvents, setGroupedEvents] = useState({});

  useEffect(() => {
    if (locationsFiltered) {
      setLoading(true);
      const locationsSorted = locationsFiltered
        ?.filter(location => location.startTime && location.endTime)
        .sort(function (a, b) {
          return new Date(a.startTime) - new Date(b.startTime);
        });
      const grouped = groupByDate(locationsSorted);
      setGroupedEvents(grouped);
      setLoading(false);
    }
  }, [locationsFiltered]);

  const groupByDate = locations => {
    const grEvents = {};
    locations.forEach(location => {
      const eventDate = dsm.getGermanDateFormat(location.startTime);
      if (!(eventDate in grEvents)) grEvents[eventDate] = [];
      grEvents[eventDate].push(location);
    });
    return grEvents;
  };

  if (loading) {
    return <LoadingAnimation />;
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
                          {event.address || event.locationName}
                        </b>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </>
      ) : null}
    </>
  );
};
