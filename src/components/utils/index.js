// create a valid ID for usage in the DOM
export function stringToId(string) {
  return string && string.toString().replace(/^[^a-z]+|[^\w:.-]+/gi, '');
}

// https://stackoverflow.com/questions/14810506/map-function-for-objects-instead-of-arrays
export const objectMap = (object, mapFn) => {
  return Object.keys(object).reduce(function(result, key) {
    result[key] = mapFn(object[key]);
    return result;
  }, {});
};

// https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
export function validateEmail(email) {
  // eslint-disable-next-line no-useless-escape
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// https://stackoverflow.com/questions/8922107/javascript-scrollintoview-middle-alignment
export function scrollIntoView(element) {
  const elementRect = element.getBoundingClientRect();
  const absoluteElementTop = elementRect.top + window.pageYOffset;
  const middle = absoluteElementTop - window.innerHeight / 2;
  window.scrollTo(0, middle);
}

// https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
export function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// usage for matomo https://matomo.org/docs/event-tracking/
export function trackEvent({ category, action, name, value }) {
  if (window._paq) {
    window._paq.push(['trackEvent', category, action, name, value]);
  }
}

export function addActionTrackingId(action, id) {
  return id ? `${action}-${id}` : action;
}

export function shouldShowPartners() {
  return testUrls(['brandenburg-4', 'brandenburg-5']);
}

function testUrls(urls) {
  return !!urls.find(
    url => typeof window !== 'undefined' && window.location.href.includes(url)
  );
}

export function getAbTestId() {
  const URLpart = 'brandenburg';
  const href = typeof window !== 'undefined' && window.location.href;
  const indexOf = href.indexOf(URLpart);

  if (indexOf !== -1) {
    const URLpartDash = URLpart + '-';
    const indexDash = href.indexOf(URLpartDash);

    if (indexDash !== -1) {
      return parseInt(href[indexDash + URLpartDash.length]);
    }

    return 0;
  }
  return -1;
}

export function formatDateTime(date) {
  return `${formatDate(date)}, ${formatTime(date)} Uhr`;
}

export function formatDate(date) {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Intl.DateTimeFormat('de', options).format(date);
}

export function formatDateShort(date) {
  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  };
  return new Intl.DateTimeFormat('de', options).format(date);
}

export function formatDateMonthYear(date) {
  const options = {
    year: 'numeric',
    month: 'long',
  };
  return new Intl.DateTimeFormat('de', options).format(date);
}

export function formatTime(date) {
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  };
  return new Intl.DateTimeFormat('de', options).format(date);
}

// Takes campaign code in the format of e.g. schleswig-holstein-1 or berlin-1
// and transforms it to Schleswig-Holstein or Berlin
export function mapCampaignCodeToState(campaignCode) {
  const stringSplit = campaignCode.split('-');
  if (stringSplit.length > 2) {
    return `${capitalize(stringSplit[0])}-${capitalize(stringSplit[1])}`;
  } else {
    return `${capitalize(stringSplit[0])}`;
  }
}

function capitalize(string) {
  return `${string.charAt(0).toUpperCase()}${string.slice(1)}`;
}

export function getMailtoUrl(to, subject, body) {
  var args = [];
  if (typeof subject !== 'undefined') {
    args.push('subject=' + encodeURIComponent(subject));
  }
  if (typeof body !== 'undefined') {
    args.push('body=' + encodeURIComponent(body));
  }

  var url = 'mailto:' + encodeURIComponent(to);
  if (args.length > 0) {
    url += '?' + args.join('&');
  }
  return url;
}
