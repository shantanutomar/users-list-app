import React from 'react';
import './Loader.css';

function Loader() {
  return (
    <section className="loader">
      <div className="outer-circle">
        <div className="mid-circle">
          <div className="inner-circle" />
        </div>
      </div>
    </section>
  );
}

export default Loader;
