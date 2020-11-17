import React from 'react';
import { useState, useEffect } from 'react';
import { TextInput } from '../TextInput';
import LabelInputErrorWrapper from '../LabelInputErrorWrapper';
import s from './style.module.less';
import cN from 'classnames';
import { Button } from '../Button';
import { navigate } from 'gatsby';

import Fuse from 'fuse.js';

export default function SearchPlaces({ showButton, onPlaceSelect }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState({});
  const [suggestionsActive, setSuggestionsActive] = useState(false);
  const [formState, setFormState] = useState({});
  const [fuse, setFuse] = useState();

  useEffect(() => {
    import('./places.json').then(({ default: places }) => {
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
      }
      console.time('Search');

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
        console.log({ fuseResults });
        console.timeEnd('Search');
        const results = fuseResults
          .map(x => ({ ...x.item, score: x.score }))
          .slice(0, 10);
        setResults(results);
      }
    } else {
      setResults([]);
    }
  }, [query, fuse]);

  const handleSuggestionClick = suggestion => {
    setQuery(suggestion.name);
    setSelectedPlace(suggestion);

    // If callback was passed let container component
    // know that the selected place changed
    if (onPlaceSelect) {
      onPlaceSelect(suggestion);
    }
    setSuggestionsActive(false);
  };

  const handleChange = e => {
    const { value } = e.target;
    setQuery(value);
  };

  const handleSubmit = e => {
    // If no place was selected, we check if the top result
    // has a very good score, if yes -> navigate to the page
    // of that place
    console.log({ selectedPlace, result: results[0] });
    if (selectedPlace.ags) {
      navigate(`/kommune/${selectedPlace.ags}`);
    } else if (results.length > 0 && results[0].score < 0.001) {
      navigate(`/kommune/${results[0].ags}`);
    } else {
      const touched = true;
      const error = 'Bitte wähle eine Stadt aus';
      setFormState({ error, touched });
    }
  };

  return (
    <div className={s.container}>
      <div className={s.inputContainer}>
        <label htmlFor="gemeinde">Stadt:</label>
        <TextInput
          id="gemeinde"
          placeholder="Stadt"
          label="Stadt"
          value={query}
          onChange={handleChange}
          onBlur={e => {
            if (
              e.relatedTarget &&
              e.relatedTarget.getAttribute('id') === 'gatsby-focus-wrapper'
            ) {
              setTimeout(() => {
                setSuggestionsActive(false);
              }, 300);
            }
          }}
        />
        <LabelInputErrorWrapper meta={formState} />
        <AutoCompleteList
          query={query}
          results={results}
          suggestionsActive={suggestionsActive}
          handleSuggestionClick={handleSuggestionClick}
        />
      </div>
      {showButton && (
        <Button className={s.sideButton} onClick={handleSubmit}>
          Finde deine Stadt
        </Button>
      )}
    </div>
  );
}

export function AutoCompleteList({
  query,
  results,
  suggestionsActive,
  handleSuggestionClick,
}) {
  return (
    <div className={cN(s.suggestions, { [s.active]: suggestionsActive })}>
      {results.length === 0 && query.length > 1 && (
        <div className={s.noSuggestionsItem}>Keine Ergebnisse</div>
      )}

      {results.length > 0 &&
        query.length > 1 &&
        results.map(x => {
          return (
            <div
              key={x.ags}
              className={s.suggestionsItem}
              role="button"
              aria-pressed="false"
              tabIndex={0}
              onClick={e => handleSuggestionClick(x)}
              onKeyDown={e => {
                // Emulate click when enter or space are pressed
                if (e.key === 'Enter' || e.keyCode === 32) {
                  e.preventDefault();
                  handleSuggestionClick(x);
                }
              }}
            >
              {x.name},{' '}
              {x.zipCodes.length === 1
                ? `${x.zipCodes[0]}`
                : `${x.zipCodes[0]} – ${x.zipCodes[x.zipCodes.length - 1]}`}
            </div>
          );
        })}
    </div>
  );
}
