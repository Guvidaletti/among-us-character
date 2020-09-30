import React from 'react';
import PropTypes from 'prop-types';

export default function Ground(props) {
  const getProps = () => {
    let p = {
      ...props,
      viewBox: '0 0 305.321 60.795',
      xmlns: 'http://www.w3.org/2000/svg'
    }
    delete p.primaryColor;
    delete p.secondaryColor;
    return p;
  }

  return (
    <svg {...getProps()}>
      <path id="Chao" d="M112.442-55.79c-.431-5.6,1.508-12.063,8.616-12.278s11.2-5.6,17.017-6.678,12.494-1.723,12.494-1.723,32.311-5.385,47.82-5.6,46.312-8.616,56.005-7.755,16.8-.646,31.88,0,57.513,4.739,62.468,5.6S378.9-77.546,378.9-77.546s42.435,10.77,38.558,19.817-13.14,14.217-42.219,19.386-46.312,7.755-62.468,8.4-82.931,1.292-94.563,0-39.635-4.308-59.236-7.539a264.544,264.544,0,0,1-32.1-7.108S112.011-46.743,112.442-55.79Z" transform="translate(-112.385 89.99)" opacity="0.77" />
    </svg>
  )
}

Ground.propTypes = {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  primaryColor: PropTypes.string,
  secondaryColor: PropTypes.string,
}

Ground.defaultProps = {
  width: '60px',
  primaryColor: '#53FDD8',
  secondaryColor: '#35A8C1',
}
