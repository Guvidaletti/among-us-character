import React, { useEffect, useRef, useState } from 'react';
import PositionDefault from '../../assets/character/body/PositionDefault';
import FirstPosition from '../../assets/character/body/FirstPosition';
import styles from './Character.scss';
import SecondPosition from '../../assets/character/body/SecondPosition';
import ThirdPosition from '../../assets/character/body/ThirdPosition';
import FourthPosition from '../../assets/character/body/FourthPosition';
import Arm from '../../assets/character/arm/Arm';
import Ground from '../../assets/ground/Ground';
import { DEFAULT_POSITION, FIRST_POSITION, FOURTH_POSITION, SECOND_POSITION, THIRD_POSITION } from '../../libraries/Position';
import { getMergedClassNames, getUniqueKey } from '../../utils/HTMLutils';
const movimentKeys = ['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft', 'w', 'a', 's', 'd'];
const rootClassName = styles.rootClassName;

export default function Character(props) {
  const colorProps = {
    primaryColor: '#F07D0D',
    secondaryColor: '#B43E15',
  };
  const [id] = useState(`player${getUniqueKey()}`);
  const [position, setPosition] = useState(DEFAULT_POSITION);
  const [positionRef] = useState(useRef(position));
  positionRef.current = position;

  const [walking, setWalking] = useState(false);
  const [turnedRight, setTurnedRight] = useState(true);
  const [walkingInterval, setWalkingInterval] = useState();

  const [posIndex, setPosIndex] = useState(-1);
  const [posIndexRef] = useState(useRef(posIndex));
  posIndexRef.current = posIndex;

  useEffect(() => {
    if (walkingInterval) {
      clearInterval(walkingInterval)
    }
    if (!walking) {
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
  }, [walking])

  useEffect(() => {
    document.addEventListener('keydown', (evt) => {
      setWalking(movimentKeys.indexOf(evt.key) > -1);
      let char = document.querySelector(`#${id}`);
      if (!char) return;
      const bound = char.getBoundingClientRect();
      let style = {
        left: bound.left,
        top: bound.top
      };
      switch (evt.key) {
        case 'ArrowUp':
        case 'w':
          style.top = `${parseInt(style.top) - 10}px`
          // TODO
          break;
        case 'ArrowDown':
        case 's':
          style.top = `${parseInt(style.top) + 10}px`
          // TODO
          break;
        case 'ArrowRight':
        case 'd':
          // TODO
          setTurnedRight(true);
          style.left = `${parseInt(style.left) + 10}px`
          break;
        case 'ArrowLeft':
        case 'a':
          style.left = `${parseInt(style.left) - 10}px`
          setTurnedRight(false);
          // TODO
          break;
        default:
          break;
      }
      char.style.left = style.left;
      char.style.top = style.top;
    })
    document.addEventListener('keyup', (evt) => {
      if (movimentKeys.indexOf(evt.key) > -1) {
        setWalking(false);
      }

    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getPosition = () => {
    switch (position) {
      case FIRST_POSITION: return (<FirstPosition {...colorProps} />);
      case SECOND_POSITION: return (<SecondPosition {...colorProps} />);
      case THIRD_POSITION: return (<ThirdPosition  {...colorProps} />);
      case FOURTH_POSITION: return (<FourthPosition {...colorProps} />);
      default: return (<PositionDefault {...colorProps} />);
    }
  };

  const getProps = () => {
    let p = {
      ...props,
      id,
      className: getMergedClassNames([
        rootClassName,
        props.className || '',
        (turnedRight) ? '' : `${rootClassName}-left`,
        (walking) ? `${rootClassName}-walking` : '',
      ]),
    };
    return p;
  };

  return (
    <div {...getProps()}>
      <div className={`${rootClassName}-arm`}>
        <Arm {...colorProps} />
      </div>
      <div className={`${rootClassName}-body`}>
        {getPosition()}
      </div>
      <div className={`${rootClassName}-ground`}>
        <Ground />
      </div>
    </div>
  )
}

Character.propTypes = {

}

Character.defaultProps = {
  position: DEFAULT_POSITION,
  walking: false,
  
}