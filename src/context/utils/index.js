import { navigate } from 'gatsby';

// Functions related to the "history" functionality used by the MunicipalityContext
export const history = {};
history.updateOnPopStateListener = (municipality, setMunicipality) => {
  if (typeof window !== `undefined`) {
    window.onpopstate = event => {
      console.log('ONPOPSTATE EVENT');
      const { state } = event;
      if (state?.name) {
        setMunicipality({ ...state, isFromHistoryEvent: true });
        adjustDocumentTitle(municipality, state.name);
      }
    };
  }
};
history.removeOnPopStateListener = () => {
  if (typeof window !== `undefined`) {
    window.onpopstate = undefined;
  }
};
history.pushToHistoryState = municipality => {
  if (typeof window !== `undefined`) {
    if (window.history?.pushState) {
      window.history.pushState(
        municipality,
        null,
        `${window.location.origin}/gemeinden/${municipality.ags}`
      );
      adjustDocumentTitle(municipality, municipality.name);
      setWindowLocationOriginForIE();
    } else {
      navigate(municipality.ags);
    }
  }
};

const setWindowLocationOriginForIE = () => {
  if (!window.location.origin) {
    window.location.origin =
      window.location.protocol +
      '//' +
      window.location.hostname +
      (window.location.port ? ':' + window.location.port : '');
  }
};

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
