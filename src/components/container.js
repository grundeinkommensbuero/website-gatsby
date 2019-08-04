import React from 'react';
import Footer from './footer';

export default ({ children }) => (
  <div>
  <div style={{ maxWidth: 1180, margin: '0 auto' }}>{children}</div>
  <Footer />
  </div>
)
