import React, { Component } from 'react';
// import { Map, GoogleApiWrapper } from 'google-maps-react';
// import { InfoWindow, Marker } from 'google-maps-react';
// import vendorSeed from '../../../../scripts/seedDB'


import { products } from './places';

import { GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import CurrentLocation from './Maps';
import API from '../utils/API';
const query = {
  term: ""
};

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: props.update,
      funcMenu: props.menu,
      funcActive: props.active,
      vendors: null,
      showingInfoWindow: false,
      activeMarker: null,
      selectedPlace: {}
    };
  }

  componentDidMount() {
    this.grabVendors();
  };

  componentDidUpdate() {
    console.log("Query:", query);
  }

  grabVendors() {
    API.getVendors()
      .then(reply => { this.setState({ vendors: reply.data.filter(vendor => vendor.status) }); })
      .catch(err => { console.log(err); return { err } });
  };

  onMarkerClick = (props, marker, e) => {
    this.state.funcMenu(props.menu);
    this.state.funcActive(true);
    console.log("This here be the props:", props);
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  onClose = props => {
    this.state.funcActive(false);
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  //  filterCategory = (e) =>{
  //   var categoryPicked = e;
  //   console.log(categoryPicked+ "category passed to filter category")
  // } 

  render() {
    const product = products[0];

    return (

      <CurrentLocation
        centerAroundCurrentLocation
        google={this.props.google}
      >
        {/* Start looping thru vendors if exists */}
        <Marker name={"my location"} icon={"http://maps.google.com/mapfiles/ms/icons/blue-dot.png"}/>
        {this.state.vendors && (query.term ?
          this.state.vendors.filter(vendor =>
            vendor.categories.indexOf(query.term) != -1
          ).map(vendor => (
            <Marker onClick={this.onMarkerClick} name={<div>{vendor.storeName}<br></br><a href={`https://maps.google.com/?q=${vendor.location[0]},${vendor.location[1]}`} target="_blank">Directions</a></div>} menu={vendor.menu} position={{ lat: vendor.location[0], lng: vendor.location[1] }} />
          )) : this.state.vendors.map(vendor => (
            <Marker onClick={this.onMarkerClick} name={<div>{vendor.storeName}<br></br><a href={`https://maps.google.com/?q=${vendor.location[0]},${vendor.location[1]}`} target="_blank">Directions</a></div>} menu={vendor.menu} position={{ lat: vendor.location[0], lng: vendor.location[1] }} />
          ))
        )}
        {/* 
        <Marker onClick={this.onMarkerClick} name={product.Name}
          position={{ lat: 32.715736, lng: -117.161087 }} />
        <Marker onClick={this.onMarkerClick} name={'here'}
          position={{ lat: 32.7560, lng: -117.161087 }} />
        <Marker onClick={this.onMarkerClick} name={'here'}
          position={{ lat: 32.842674, lng: -117.257767 }} /> */}

        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>
      </CurrentLocation>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDcVj1DhyIDz72KxCdYdlyYfeYn01e_SAw'
})(MapContainer);

export const categoryFilter = (e) => {
  query.term = e;
  console.log(e + " here");
  //this.filterCategory(e);//figure out how to pass this to the function
}
