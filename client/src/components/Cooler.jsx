import React from 'react';

import coolerImage from '../assets/cooler.png'
import styles from '../style/Cooler.module.css';

const Cooler = ({isRotating}) => {
  return (
    <div >
      <img
        src={coolerImage}
        className={isRotating ? styles.rotating : ""}
        alt="Cooler"
        style={{width: '250px', height: '250px', pointerEvents: 'none'}}
      />
    </div>
  );
};

export default Cooler;