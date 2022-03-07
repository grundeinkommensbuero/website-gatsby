import React from 'react';
import { CreateMeetup } from '../../components/Forms/Meetup';

const IframeMap = () => {
  return (
    <CreateMeetup
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
