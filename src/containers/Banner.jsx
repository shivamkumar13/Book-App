import React, { Component } from 'react';

const Banner = () => {
  return (
    <header className="container-fluid showcase text-center">
      <div className="showcase-top">
        <img src="./images" alt="" className="showcase-logo" />
      </div>
      <div className="showcase-content">
        <h3 className="display-2 white title">Library</h3>
        <h4 className="display-4 white subtitle">
          Comics | Novel | Magazines | Literature
        </h4>
      </div>
    </header>
  );
};

export default Banner;
