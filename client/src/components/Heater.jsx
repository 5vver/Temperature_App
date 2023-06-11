import React from 'react';

import heaterImage from '../assets/heater.svg'
import styles from '../style/Heater.module.css';

const Heater = ({isHeating}) => {
  return (
    <div>
      <img
        src={heaterImage}
        className={isHeating ? styles.pulse : ""}
        alt="Heater"
        style={{width: '250px', height: '250px', pointerEvents: 'none'}}
      />
    </div>
  );
};

export default Heater;