import React, { Component } from 'react';

class LocationList extends Component {
  render() {
      return (
          <section className="locations list">
          {
              this.props.locations.map(location =>
                  <div key={location.id}>
                      <br/>
                      {location.name}
                      <br/>
                      {location.address}
                  </div>
              )
          }
          </section>
      )
  }
}
export default LocationList