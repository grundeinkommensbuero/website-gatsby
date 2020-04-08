/**
 *  This file holds a hook to get data for the crowdfunding campaign
 */

import { useState } from 'react';
import CONFIG from '../../../../aws-config';
import $ from 'jquery';

/*
  States:
  - undefined
  - data
*/

export const useCrowdfundingData = projectId => {
  const [data, setData] = useState(() => {
    if (typeof window !== 'undefined') {
      getCrowdfundingData(projectId).then(result => setData(result));
    }
  });

  return data;
};

// gets data of crowdfunding campaign
const getCrowdfundingData = async projectId => {
  try {
    const request = {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(
      `${CONFIG.API.INVOKE_URL}/analytics/crowdfunding?projectId=${projectId}`,
      request
    );

    if (response.status === 200) {
      return await response.json();
    } else {
      console.log('Response is not 200', response.status);
    }
  } catch (error) {
    console.log('Error while getting crowdfunding data', error);
  }
};

export const useGetCrowdfundingDirectly = projectId => {
  const [crowdFunding, setCrowdFunding] = useState(() => {
    loadScript('//api.startnext.com/js/cfapiclient-0.1.js').then(() => {
      const apiUrl = 'https://api.startnext.com';
      const clientOptions = {
        url: apiUrl,
        client_id: 1000000001,
        jquery: $,
        version: '1.2',
      };
      const apiClient = new cfAPIClient(clientOptions);
      apiClient.get(
        '/projects/' + projectId,
        { lang: 'de' },
        (data, textStatus, jqXHR) => {
          setCrowdFunding(data);
        }
      );
    });
  });
  return [crowdFunding];
};

// https://stackoverflow.com/questions/16839698/jquery-getscript-alternative-in-native-javascript
const loadScript = (source, beforeEl, async = true, defer = true) => {
  return new Promise((resolve, reject) => {
    if (typeof window !== `undefined`) {
      let script = document.createElement('script');
      const prior = beforeEl || document.getElementsByTagName('script')[0];

      script.async = async;
      script.defer = defer;

      function onloadHander(_, isAbort) {
        if (
          isAbort ||
          !script.readyState ||
          /loaded|complete/.test(script.readyState)
        ) {
          script.onload = null;
          script.onreadystatechange = null;
          script = undefined;

          if (isAbort) {
            reject();
          } else {
            resolve();
          }
        }
      }

      script.onload = onloadHander;
      script.onreadystatechange = onloadHander;

      script.src = source;
      prior.parentNode.insertBefore(script, prior);
    }
  });
};
