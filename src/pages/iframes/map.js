import React from 'react';
import { ShowMeetups } from '../../components/Maps/ShowMeetups';

const IframeMap = () => {
  return (
    <div style={{ paddingTop: '10px' }}>
      <ShowMeetups
        isIframe={true}
        mapConfig={{
          state: 'climate',
          config: {
            maxBounds: [
              [13.05, 52.2],
              [13.8, 52.8],
            ],
          },
        }}
      />
    </div>
  );
};

export default IframeMap;
