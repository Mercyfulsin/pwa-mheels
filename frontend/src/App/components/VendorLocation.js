import React, { Component } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class VendorGeo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      func: props.func,
      icon: props.icon,
      class: props.className,
      text: props.children,
      latitude: null,
      longitude: null,
    }
  }

  // componentDidUpdate() {
  //   this.state.latitude ? console.log(`We have something here ${this.state.latitude} , ${this.state.longitude}`)
  //     : console.log("Not Lat+Long yet..");
  // }

  position = async () => {
    await navigator.geolocation.getCurrentPosition(
      position => {
        this.state.func([position.coords.latitude, position.coords.longitude]);
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      err => console.log(err)
    );
  }

  render() {
    return (
      <div onClick={this.position}><FontAwesomeIcon className={this.state.class} icon={this.state.icon} />{this.state.text}</div>);
  }
}

export default VendorGeo;