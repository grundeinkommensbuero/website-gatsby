import React, { useRef } from 'react';
import { useState, useEffect, useLayoutEffect } from 'react';
import { TextInput } from '../TextInput';
import LabelInputErrorWrapper from '../LabelInputErrorWrapper';
import s from './style.module.less';
import cN from 'classnames';
import { Button } from '../Button';
import { navigate } from 'gatsby';

import Fuse from 'fuse.js';

const handleButtonClickDefault = ({ validate }) => {
  // If no place was selected, we check if the top result
  // has a very good score, if yes -> navigate to the page
  // of that place
  // --> validate function
  const validation = validate();
  if (validation.status === 'success') {
    navigate(validation.slug);
  }
};

export const SearchPlaces = ({
  showButton,
  buttonLabel = 'Finde deine Stadt',
  placeholder = 'Stadt oder Gemeinde',
  onPlaceSelect,
  label = 'Stadt oder Gemeinde:',
  searchTitle,
  validateOnBlur,
  inputSize,
  buttonSize,
  profileButtonStyle,
  isInsideForm,
  handleButtonClick = handleButtonClickDefault,
  initialPlace = {},
}) => {
  const [query, setQuery] = useState(initialPlace.name || '');
  const [results, setResults] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(initialPlace);
  const [suggestionsActive, setSuggestionsActive] = useState(false);
  const [formState, setFormState] = useState({});
  const [fuse, setFuse] = useState();
  const [focusedResult, setFocusedResult] = useState(0);

  useEffect(() => {
    import('./municipalitiesForSearch.json').then(({ default: places }) => {
      setFuse(
        new Fuse(places, {
          keys: ['name', 'zipCodes'],
          includeScore: true,
          threshold: 0.2,
        })
      );
    });
  }, []);

  useEffect(() => {
    if (query.length > 1) {
      if (query !== selectedPlace.name) {
        setSuggestionsActive(true);
        setSelectedPlace({});
        if (onPlaceSelect) {
          onPlaceSelect();
        }
      }

      if (fuse) {
        // We need to split the query string into zip code
        // and municipality name, so the user can search
        // for something like 99955 Bad Tennstedt
        let digits = query.match(/\d+/);
        digits = digits ? digits[0] : '';
        const name = query.replace(/\d+/g, '').trim();

        let searchProps;
        // If both zip code and name were inside the query string
        // we should search the data for name AND zip code
        if (digits !== '' && name !== '') {
          searchProps = {
            $and: [{ name: name }, { zipCodes: digits }],
          };
        } else if (digits !== '') {
          searchProps = digits;
        } else if (name !== '') {
          searchProps = name;
        } else {
          searchProps = '';
        }

        const fuseResults = fuse.search(searchProps);
        const results = fuseResults
          .map(x => ({ ...x.item, score: x.score }))
          .slice(0, 10);
        // Removed the sort by population for now, because we need to rewrite it
        // due to issues when searching for zip codes for example
        // .sort((a, b) => b.population - a.population);

        setResults(results);
      }
    } else {
      setResults([]);
    }
  }, [query, fuse]);

  const validate = () => {
    let slug;
    if (selectedPlace.ags) {
      slug = `/gemeinden/${selectedPlace.slug}`;
      return { status: 'success', slug };
    }
    if (results.length > 0 && results[0].score < 0.001) {
      slug = `/gemeinden/${results[0].slug}`;
      return { status: 'success', slug };
    }
    const touched = true;
    const error = 'Bitte wähle eine Stadt aus';
    setFormState({ error, touched });
    return { status: 'failed' };
  };

  const handleSuggestionClick = suggestion => {
    if (suggestion) {
      setQuery(suggestion.name);
      setSelectedPlace(suggestion);

      // If callback was passed let container component
      // know that the selected place changed
      if (onPlaceSelect) {
        onPlaceSelect(suggestion);
      }
      setSuggestionsActive(false);
    }
  };

  const handleChange = e => {
    const { value } = e.target;
    setQuery(value);
    const touched = false;
    const error = '';
    setFormState({ error, touched });
  };

  const handleEnterKey = e => {
    // Emulate click when enter or space are pressed
    if (e.key === 'Enter') {
      handleSuggestionClick(results[0]);
    }
  };

  const handleArrowListNavigation = e => {
    const upBehavior =
      e.key === 'ArrowUp' ||
      e.which === 38 ||
      ((e.key === 'Tab' || e.which === 9) && e.shiftKey);
    const downBehavior =
      e.key === 'ArrowDown' ||
      e.which === 40 ||
      ((e.key === 'Tab' || e.which === 9) && !e.shiftKey);

    if (upBehavior || downBehavior) {
      e.preventDefault();
    }

    if (downBehavior) {
      // At the end of a list jump back to the beginning
      // and vice versa
      if (
        focusedResult < results.length - 1 &&
        typeof focusedResult !== 'undefined'
      ) {
        setFocusedResult(prev => prev + 1);
      } else {
        setFocusedResult(0);
      }
    } else if (upBehavior) {
      if (focusedResult > 0 && focusedResult < results.length) {
        setFocusedResult(prev => prev - 1);
      } else {
        setFocusedResult(results.length - 1);
      }
    }
  };

  const handleBlur = e => {
    const isAutoCompleteTarget =
      e.relatedTarget &&
      [...e.relatedTarget.classList].join('').includes('suggestionsItem');

    if (!isAutoCompleteTarget) {
      setTimeout(() => {
        setSuggestionsActive(false);

        // If search places input is inside form,
        // we want to choose first element of suggestions as place
        if (!selectedPlace.ags && isInsideForm) {
          if (results.length > 0 && results[0].score < 0.001) {
            // Should have same behaviour as click on suggestion
            handleSuggestionClick(results[0]);
          }
        }
        if (validateOnBlur) {
          validate();
        }
      }, 300);
      setFocusedResult(0);
    }
  };

  return (
    <>
      {label && <label>{label}</label>}
      <div className={s.container}>
        {searchTitle && <h2 className={s.searchTitle}>{searchTitle}</h2>}
        <div className={s.inputContainer}>
          <TextInput
            size={inputSize}
            placeholder={placeholder}
            autoComplete="off"
            label="Stadt"
            value={query}
            onChange={handleChange}
            onKeyDown={handleEnterKey}
            onBlur={handleBlur}
            className={cN(s.searchBar, { [s.isNotInsideForm]: !isInsideForm })}
          />

          <AutoCompleteList
            query={query}
            results={results}
            focusedResult={focusedResult}
            suggestionsActive={suggestionsActive}
            handleSuggestionClick={handleSuggestionClick}
            handleArrowListNavigation={handleArrowListNavigation}
            handleBlur={handleBlur}
          />
          <LabelInputErrorWrapper meta={formState} />
        </div>
        {showButton && (
          <Button
            id="linkButton"
            size={buttonSize}
            className={cN(
              { [s.sideButton]: !profileButtonStyle },
              { [s.profileSideButton]: profileButtonStyle }
            )}
            onClick={event => handleButtonClick({ event, validate })}
          >
            {buttonLabel}
          </Button>
        )}
      </div>
    </>
  );
};
export function AutoCompleteList({
  query,
  results,
  focusedResult,
  suggestionsActive,
  handleSuggestionClick,
  handleBlur,
  handleArrowListNavigation,
}) {
  const resultsRef = useRef([]);

  useEffect(() => {
    resultsRef.current = resultsRef.current.slice(0, results.length);
  }, [results]);

  useLayoutEffect(() => {
    if (
      typeof focusedResult !== 'undefined' &&
      focusedResult < resultsRef.current.length
    ) {
      resultsRef.current[focusedResult].focus();
    }
  }, [focusedResult, resultsRef]);

  return (
    <div
      aria-hidden={true}
      className={cN(s.suggestions, { [s.active]: suggestionsActive })}
      onBlur={handleBlur}
    >
      {results.length === 0 && query.length > 1 && (
        <div className={s.noSuggestionsItem}>Keine Ergebnisse</div>
      )}

      {results.length > 0 &&
        query.length > 1 &&
        results.map((x, i) => {
          return (
            <div
              key={x.ags}
              id={`autocomplete-${x.name.toLowerCase()}`}
              className={s.suggestionsItem}
              role="button"
              aria-pressed="false"
              tabIndex={0}
              ref={el => (resultsRef.current[i] = el)}
              onClick={e => handleSuggestionClick(x)}
              onKeyDown={e => {
                // Emulate click when enter or space are pressed
                if (e.key === 'Enter' || e.keyCode === 32) {
                  e.preventDefault();
                  handleSuggestionClick(x);
                }
                handleArrowListNavigation(e);
              }}
            >
              {x.name},{' '}
              {x.zipCodes.length === 1
                ? `${x.zipCodes[0]}`
                : `${x.zipCodes[0]} – ${x.zipCodes[x.zipCodes.length - 1]}`}
            </div>
          );
        })}
    </div>
  );
}
