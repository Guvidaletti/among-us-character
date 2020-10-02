import React, { useState } from 'react';
import Character from './Character';

export default {
  title: 'Character',
  component: Character,
};

export const Right = () => {
  const [walking, setWalking] = useState(false);
  return (
    <>
      <Character walking={walking} />
      <button style={{ position: 'fixed', top: '500px' }} onClick={() => setWalking(!walking)}>{walking ? 'Parar' : 'Andar'}</button>
    </>)
}
export const Left = () => {
  const [walking, setWalking] = useState(false);
  return (
    <>
      <Character walking={walking} turnedRight={false} />
      <button style={{ position: 'fixed', top: '500px' }} onClick={() => setWalking(!walking)}>{walking ? 'Parar' : 'Andar'}</button>
    </>)
}

