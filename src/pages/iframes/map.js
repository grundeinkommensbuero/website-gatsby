import React from 'react';
import { ShowMeetups } from '../../components/Maps/ShowMeetups';

const IframeMap = () => {
  return (
    <ShowMeetups
      isIframe={true}
      mapConfig={{
        state: 'berlin',
        config: {
          maxBounds: [
            [13.05, 52.2],
            [13.8, 52.8],
          ],
        },
      }}
    />
  );
};

export default IframeMap;
