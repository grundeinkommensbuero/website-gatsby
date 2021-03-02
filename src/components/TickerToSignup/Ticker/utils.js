export const diffSeconds = (dt2, dt1) => {
  let diff = (dt2.getTime() - dt1.getTime()) / 1000;
  return Math.abs(Math.round(diff));
};

export const diffCount = (c2, c1) => {
  let diff = c1 - c2;
  return diff;
};

export const calcTickerValues = ({
  prevTimestamp,
  currTimestamp,
  setTimePassedInIntervalInPercent
}) => {
  // prepare variables for calulation of time passed in percent
  const currTime = new Date();
  const intervalLength = diffSeconds(prevTimestamp, currTimestamp);
  const timePassed = diffSeconds(currTimestamp, currTime);
  const calcTimePassed = timePassed / intervalLength;
  setTimePassedInIntervalInPercent(calcTimePassed);
};

export const updateTicker = ({
  statsSummary,
  timePassedInIntervalInPercent,
  setPeopleCount,
  setMunicipalityCount,
  updatedTimes,
  setUpdatedTimes,
  refreshContextStats
}) => {
  console.log('Percent of Interval passed:', timePassedInIntervalInPercent);
  // Get users and calculate users won in the last 15 minutes
  const prevCountUsers = statsSummary?.previous?.users;
  const currCountUsers = statsSummary?.users;
  const usersWonInInterval = diffCount(prevCountUsers, currCountUsers);
  const usersToAdd = Math.floor(usersWonInInterval * timePassedInIntervalInPercent);
  console.log('Users to add:', usersToAdd);
  // Get municiplaities and calculate users won in the last 15 minutes
  const prevCountMunicipalities = statsSummary?.previous?.municipalities;
  const currCountMunicipalities = statsSummary?.municipalities;
  const municipalitiesWonInInterval = diffCount(prevCountMunicipalities, currCountMunicipalities);
  const municipalitiesToAdd = Math.floor(municipalitiesWonInInterval * timePassedInIntervalInPercent);
  console.log('Municipalities to add:', municipalitiesToAdd);

  if (timePassedInIntervalInPercent <= 1) {
    console.log('Setting Users to:', prevCountUsers + usersToAdd);
    setPeopleCount(prevCountUsers + usersToAdd);
    console.log('Setting Municipalities to:', prevCountUsers + usersToAdd);
    setMunicipalityCount(prevCountMunicipalities + municipalitiesToAdd);
    setTimeout(() => {
      setUpdatedTimes(updatedTimes + 1);
    }, 1000);
  } else {
    refreshContextStats();
  }
};

export const numberWithDots = (num = 0) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};