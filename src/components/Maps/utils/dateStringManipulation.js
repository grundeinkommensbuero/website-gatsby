export const getGermanDateFormat = date => {
  return new Date(date).toLocaleDateString('de-DE');
};

export const getDateWithWeekday = date => {
  if (checkIfDateIsToday(date)) {
    return checkIfDateIsToday(date);
  } else if (checkIfDateIsTomorrow(date)) {
    return checkIfDateIsTomorrow(date);
  }
  return `${getDayName(new Date(date))}, ${getDayWithMonth(date)}`;
};

export const getDayName = (dateStr, locale = 'de-DE') => {
  var date = new Date(dateStr);
  return date.toLocaleDateString(locale, { weekday: 'long' });
};

export const localeTime = date => {
  return new Date(date).toLocaleTimeString('de-DE', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const getDayWithMonth = date => {
  return getGermanDateFormat(date).slice(0, 6);
};

const checkIfDateIsToday = date => {
  if (checkIfInRangeOfDaysX(date, 0)) {
    return 'Heute';
  }
  return false;
};

const checkIfDateIsTomorrow = date => {
  if (checkIfInRangeOfDaysX(date, 1)) {
    return 'Morgen';
  }
  return false;
};

const checkIfInRangeOfDaysX = (dateStr, num) => {
  const date = new Date(dateStr);
  const dateToCheck = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );
  const dateToday = new Date();
  const dateToCompare = new Date(
    dateToday.getFullYear(),
    dateToday.getMonth(),
    dateToday.getDate() + num
  );
  if (
    dateToCheck.getFullYear() === dateToCompare.getFullYear() &&
    dateToCheck.getMonth() === dateToCompare.getMonth() &&
    dateToCheck.getDate() === dateToCompare.getDate()
  ) {
    return true;
  }
  return false;
};
