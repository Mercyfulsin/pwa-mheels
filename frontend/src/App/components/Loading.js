import React from "react";
import loading from "../assets/cart.webp";
const style = { backgroundColor: '#a4c9e7', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '..', height: '..' };
const Loading = () => (
  <div className="spinner align-middle" style={style}>
    <img src={loading} alt="Loading" />
  </div>
);

export default Loading;
