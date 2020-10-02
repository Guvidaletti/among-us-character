import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { getMergedClassNames, getUniqueKey } from '../../utils/HTMLutils';
import Character from '../character/Character';
import styles from './CharacterManager.scss';
const movimentKeys = ['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft', 'w', 'a', 's', 'd'];
const rootClassName = styles.rootClassName;

export default function CharacterManager(props) {

  const [arrayOfKeysPressed, setArrayOfKeysPressed] = useState([]);
  const [kpRef] = useState(useRef(arrayOfKeysPressed));
  kpRef.current = arrayOfKeysPressed;

  const [walking, setWalking] = useState(false);
  const [turnedRight, setTurnedRight] = useState(true);
  const [id] = useState(getUniqueKey());

  const [left, setLeft] = useState(0);
  const [top, setTop] = useState(0);
  const [leftRef] = useState(useRef(left));
  const [topRef] = useState(useRef(top));
  leftRef.current = left;
  topRef.current = top;

  const [walkingInterval, setWalkingInterval] = useState();

  useEffect(() => {
    const addKey = (evt) => {
      const arr = kpRef.current.slice();
      if (arr.indexOf(evt.key) === -1) {
        arr.push(evt.key);
        setArrayOfKeysPressed(arr);
      }
    };
    const removeKey = (evt) => {
      if (kpRef.current.indexOf(evt.key) > -1) {
        const arr = kpRef.current.filter(key => key !== evt.key);
        setArrayOfKeysPressed(arr);
      }
    };
    document.addEventListener('keydown', addKey);
    document.addEventListener('keyup', removeKey);
    return () => {
      document.removeEventListener('keydown', addKey);
      document.removeEventListener('keyup', removeKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  useEffect(() => {
    if (arrayOfKeysPressed.some(key => movimentKeys.indexOf(key) > -1)) {
      setWalking(true);
    } else {
      setWalking(false)
    }
    if (arrayOfKeysPressed.indexOf('a') > -1 || arrayOfKeysPressed.indexOf('ArrowLeft') > -1) {
      setTurnedRight(false);
    }
    if (arrayOfKeysPressed.indexOf('d') > -1 || arrayOfKeysPressed.indexOf('ArrowRight') > -1) {
      setTurnedRight(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arrayOfKeysPressed]);

  useEffect(() => {
    if (walkingInterval) {
      clearInterval(walkingInterval);
    }
    if (walking) {
      setWalkingInterval(
        setInterval(() => {
          if (kpRef.current.indexOf('a') > -1 || kpRef.current.indexOf('ArrowLeft') > -1) {
            setLeft(leftRef.current - 10)
          }
          if (kpRef.current.indexOf('d') > -1 || kpRef.current.indexOf('ArrowRight') > -1) {
            setLeft(leftRef.current + 10)
          }
          if (kpRef.current.indexOf('w') > -1 || kpRef.current.indexOf('ArrowUp') > -1) {
            setTop(topRef.current - 10)
          }
          if (kpRef.current.indexOf('s') > -1 || kpRef.current.indexOf('ArrowDown') > -1) {
            setTop(topRef.current + 10)
          }
        }, 100)
      );
    } else {

    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walking]);

  const getProps = () => {
    let p = {
      ...props,
      id: props.id ? props.id : id,
      className: getMergedClassNames([
        rootClassName,
        props.className || '',
      ]),
      style: {
        position: 'fixed',
        left: `${left}px`,
        top: `${top}px`,
      }
    };
    return p;
  };

  return (
    <div {...getProps()}>
      <Character
        walking={walking}
        turnedRight={turnedRight}
      />
    </div>
  )
}

CharacterManager.propTypes = {
  moviment: PropTypes.bool,
}

CharacterManager.defaultProps = {
  moviment: true,
}