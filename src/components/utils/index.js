import React from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { INLINES } from '@contentful/rich-text-types';

// create a valid ID for usage in the DOM
export function stringToId(string) {
  return string && string.toString().replace(/^[^a-z]+|[^\w:.-]+/gi, '');
}

// Generates a random string (e.g. for generating random password)
export function getRandomString(bytes) {
  const randomValues = new Uint8Array(bytes);
  window.crypto.getRandomValues(randomValues);
  return Array.from(randomValues)
    .map(intToHex)
    .join('');
}

function intToHex(nr) {
  return nr.toString(16).padStart(2, '0');
}

export function contentfulJsonToHtml(json) {
  const website_url = 'https://www.change.org';

  const documentToREactComponentsOptions = {
    // needed so that line breaks are properly added.
    renderText: text => {
      return text.split('\n').reduce((children, textSegment, index) => {
        return [...children, index > 0 && <br key={index} />, textSegment];
      }, []);
    },
    renderNode: {
      [INLINES.HYPERLINK]: node => {
        return (
          <a
            href={node.data.uri}
            target={`${
              node.data.uri.startsWith(website_url) ? '_blank' : '_self'
            }`}
          >
            {node.content[0].value}
          </a>
        );
      },
    },
  };

  return documentToReactComponents(json, documentToREactComponentsOptions);
}
