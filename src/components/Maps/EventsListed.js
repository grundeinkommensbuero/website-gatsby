import React from 'react';

export const EventsListed = ({ locationsFiltered }) => {
  const locationsSorted = locationsFiltered
    ?.filter(location => location.startTime && location.endTime)
    .sort(function(a, b) {
      return new Date(a.startTime) - new Date(b.startTime);
    });

  const groupByDate = locations => {
    const groupedEvents = {};

    locations.forEach(location => {
      if (!(location.startTime in groupedEvents)) {
        groupedEvents[location.startTime] = [];
        groupedEvents[location.startTime].push(location);
      } else {
        groupedEvents[location.startTime].push(location);
      }
    });
  };

  if (locationsSorted) {
    const groupedEvents = groupByDate(locationsSorted);
    console.log(groupedEvents);
  }

  return (
    <div>
      <h2>Komm zu einer Sammelaktion</h2>
      {locationsSorted?.map((location, index) => {
        return (
          <div key={index}>
            <p>{location.address}</p>
            <p>{`${new Date(location.startTime).toLocaleDateString(
              'de-DE'
            )} ${new Date(location.startTime).toLocaleTimeString('de-DE', {
              hour: '2-digit',
              minute: '2-digit',
            })}`}</p>
            <p>{`${new Date(location.endTime).toLocaleDateString(
              'de-DE'
            )} ${new Date(location.endTime).toLocaleTimeString('de-DE', {
              hour: '2-digit',
              minute: '2-digit',
            })}`}</p>
          </div>
        );
      })}
    </div>
  );
};
