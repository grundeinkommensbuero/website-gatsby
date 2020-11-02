import React from 'react';
import { AuthProvider, OverlayProvider } from '@xbge/logic';
import SurveySaver from './src/components/SurveySaver';

// This is used to wrap the page, so we can wrap the context provider around the app
export default ({ element }) => (
  <AuthProvider>
    <SurveySaver>
      <OverlayProvider>{element}</OverlayProvider>
    </SurveySaver>
  </AuthProvider>
);
