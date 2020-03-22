import React from 'react';
import './Loader.css';

function Loader() {
  return (
    <div className="loader">
      <div className="outer-circle">
        <div className="mid-circle">
          <div className="inner-circle" />
        </div>
      </div>
    </div>
  );
}

export default Loader;
