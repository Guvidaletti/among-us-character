import React from 'react';
import PropTypes from 'prop-types';

export default function Arm(props) {
  const getProps = () => {
    let p = {
      ...props,
      viewBox: '0 0 75.265 218.041',
      xmlns: 'http://www.w3.org/2000/svg'
    };
    delete p.primaryColor;
    delete p.secondaryColor;
    return p;
  }

  return (
    <svg {...getProps()}>
      <g id="Braco" transform="translate(-88.392 -148.599)">
        <path id="Borda_Topo_Braço" data-name="Borda Topo Braço" d="M669.154,150.867c16.811,1.834,18.339,1.223,18.95,15.894-.917,12.837-2.906,33.506-4.585,37.289-2.882,4.226-39.545,5.619-46.068,7.266s-11.044,1.7-14.907,5.624c-3.059-6.472.654-21.188,2.29-32.145C631.866,147.505,660.6,150.562,669.154,150.867Z" transform="translate(-527.897 -2.086)" />
        <path id="Borda_Braço" data-name="Borda Braço" d="M114.826,193.343s-15.261,34.936-12.32,82.871,1.25,82.222,12.033,87.728,26.527,17.515,38.351,15.451,24.269-10.06,24.492-15.451-2.613-36.979-2.613-36.979l-1.339-143.3H145.876Z" transform="translate(-13.737 -12.989)" />
        <path id="parte-baixo" d="M110.036,192.033s-7.827,52.431-6.146,93.875,3.36,48.445,9.521,53.205,16.47,11.909,23.225,10.124,9.177-6.173,9.3-10.834-1.657-30.845-1.657-30.845l-.765-123.89H127.776Z" fill={props.secondaryColor} />
        <path id="parte-cima" d="M648.038,150.784c9.113.994,9.942.663,10.273,8.616-.5,6.959-1.576,18.164-2.485,20.215-1.562,2.291-21.438,3.046-24.974,3.939s-4.746.724-6.84,2.853c-1.658-3.509-.887-11.291,0-17.231C627.823,148.961,643.4,150.618,648.038,150.784Z" transform="translate(-513 13)" fill={props.primaryColor} />
      </g>
    </svg>
  )
}

Arm.propTypes = {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  primaryColor: PropTypes.string,
  secondaryColor: PropTypes.string,
}

Arm.defaultProps = {
  height: '50px',
  primaryColor: '#53FDD8',
  secondaryColor: '#35A8C1',
}
