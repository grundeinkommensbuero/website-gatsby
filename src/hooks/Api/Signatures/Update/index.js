/**
 *  This file holds a hook (or multiple hooks) which serves as api call
 *  to update a signature list in the backend (e.g. add a count, if user scanned
 *  qr code)
 */

import { useState } from 'react';
import { config } from '../../../../../aws-config';

/*
  States: 
  - null
  - error 
  - updating
  - updated
*/

export const useUpdateSignatureListByUser = () => {
  const [state, setState] = useState(null);
  return [state, data => updateSignatureListByUser(data, setState)];
};

//function, which makes an api call to set the signature count
//for a specific list after user has scanned the qr code
const updateSignatureListByUser = async ({ listId, count }, setState) => {
  //make api call to create new singature list and get pdf
  setState('updating');
  try {
    const request = {
      method: 'PATCH',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ count: count }),
    };
    const response = await fetch(
      `${config.API.INVOKE_URL}/signatures/${listId}`,
      request
    );
    if (response.status === 204) {
      setState('updated');
    } else {
      console.log('Response code not 204', response.status);
      setState('error');
    }
  } catch (error) {
    console.log('Error while updating signature list', error);
    setState('error');
  }
};
