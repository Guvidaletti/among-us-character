import React, { useEffect, useRef, useState } from 'react';
import Arm from '../../assets/character/arm/Arm';
import PositionDefault from '../../assets/character/body/PositionDefault';
import Ground from '../../assets/ground/Ground';
import { DEFAULT_POSITION, FIRST_POSITION, FOURTH_POSITION, SECOND_POSITION, THIRD_POSITION } from '../../libraries/Position';
import { getMergedClassNames, getUniqueKey } from '../../utils/HTMLutils';
import PropTypes from 'prop-types';
import styles from './Character.scss';
import FirstPosition from '../../assets/character/body/FirstPosition';
import SecondPosition from '../../assets/character/body/SecondPosition';
import ThirdPosition from '../../assets/character/body/ThirdPosition';
import FourthPosition from '../../assets/character/body/FourthPosition';
const rootClassName = styles.rootClassName;

export default function Character(props) {
  const [id] = useState(`player${getUniqueKey()}`);
  const [position, setPosition] = useState(DEFAULT_POSITION);
  const [positionRef] = useState(useRef(position));
  positionRef.current = position;

  const [walkingInterval, setWalkingInterval] = useState();

  const [posIndex, setPosIndex] = useState(-1);
  const [posIndexRef] = useState(useRef(posIndex));
  posIndexRef.current = posIndex;

  useEffect(() => {
    if (walkingInterval) {
      clearInterval(walkingInterval)
    }
    if (!props.walking) {
      setPosition(DEFAULT_POSITION)
      setPosIndex(0);
    } else {
      setWalkingInterval(
        setInterval(() => {
          switch (posIndexRef.current) {
            case 0:
              setPosition(FIRST_POSITION);
              setPosIndex(1);
              break;
            case 1:
              setPosition(SECOND_POSITION);
              setPosIndex(2);
              break;
            case 2:
              setPosition(FOURTH_POSITION);
              setPosIndex(3);
              break;
            case 3:
              setPosition(THIRD_POSITION);
              setPosIndex(0);
              break;
            default: break;
          }
        }, 100)
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.walking])

  const getProps = () => {
    let p = {
      ...props,
      id: props.id ? props.id : id,
      className: getMergedClassNames([
        rootClassName,
        props.className || '',
        (props.turnedRight) ? '' : `${rootClassName}-left`,
        (props.walking) ? `${rootClassName}-walking` : '',
      ]),
    };
    delete p.position;
    return p;
  };

  const getPosition = () => {
    switch (position) {
      case FIRST_POSITION: return (<FirstPosition {...props.colors} />);
      case SECOND_POSITION: return (<SecondPosition {...props.colors} />);
      case THIRD_POSITION: return (<ThirdPosition  {...props.colors} />);
      case FOURTH_POSITION: return (<FourthPosition {...props.colors} />);
      default: return (<PositionDefault {...props.colors} />);
    }
  };

  return (
    <div {...getProps()}>
      <div className={`${rootClassName}-arm`}>
        <Arm {...props.colors} />
      </div>
      <div className={`${rootClassName}-body`}>
        {getPosition()}
      </div>
      <div className={`${rootClassName}-ground`}>
        <Ground />
      </div>
    </div>
  );
}

Character.propTypes = {
  colors: PropTypes.exact({
    primaryColor: PropTypes.string,
    secondaryColor: PropTypes.string,
  }),
}

Character.defaultProps = {
  walking: false,
  turnedRight: true,
}