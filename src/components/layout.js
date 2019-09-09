import React from 'react'
import Navigation from './navigation'
import Footer from './Footer'

class Template extends React.Component {
  render() {
    const { children } = this.props

    return (
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
        <Navigation />
        {children}
        <Footer />
      </div>
    )
  }
}

export default Template
