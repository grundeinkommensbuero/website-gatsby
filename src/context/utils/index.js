import { navigate } from 'gatsby';

// Functions related to the "history" functionality used by the MunicipalityContext
export const history = {};

history.updateOnPopStateListener = (
  municipality,
  setMunicipality,
  setPageContext
) => {
  if (typeof window !== `undefined`) {
    window.onpopstate = event => {
      const { state } = event;
      const municipalityState = state?.municipality;
      const pageContextState = state?.pageContext;

      // Use to debug window history event
      // console.log('ONPOPSTATE EVENT\n', state, event);

      if (municipalityState) {
        setMunicipality({ ...municipalityState });
        adjustDocumentTitle(municipality, municipalityState.name);
      }
      if (pageContextState) {
        setPageContext({ ...pageContextState, isFromHistoryEvent: true });
      }
    };
  }
};

history.removeOnPopStateListener = () => {
  if (typeof window !== `undefined`) {
    window.onpopstate = undefined;
  }
};

history.pushToHistoryState = (municipality, pageContext) => {
  if (typeof window !== `undefined`) {
    if (window.history?.pushState) {
      window.history.pushState(
        { municipality, pageContext },
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

history.replaceHistoryState = (municipality, pageContext) => {
  // console.log('replaced history state');

  if (typeof window !== `undefined`) {
    if (window.history?.replaceState) {
      window.history.replaceState(
        { municipality, pageContext },
        null,
        `${window.location.href}`
      );
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
