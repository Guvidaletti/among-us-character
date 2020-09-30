export const getMergedClassNames = (arr = []) => {
  return arr.filter(el => el !== '').join(' ');
}

export const getUniqueKey = () => {
  const geraRand = () => ('_' + Math.floor(Math.random() * 1000000000000000) + 1);
  let arr = JSON.parse(sessionStorage.getItem('chavesUtilizadas')) || [];
  let rand = geraRand();
  while (arr.indexOf(rand) > -1) {
    rand = geraRand();
  }
  arr.push(rand);
  sessionStorage.setItem('chavesUtilizadas', JSON.stringify(arr));
  return rand;
}

export const isMobile = () => {
  const toMatch = [
    /Android/i,
    /webOS/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i
  ];

  return toMatch.some((toMatchItem) => {
    return navigator.userAgent.match(toMatchItem);
  });
}