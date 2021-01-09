import { StationType } from "../types";


export const convertDataToObject = (text: string): Array<StationType> => {
  let arrayFromTxt = text.split('\n');
  let newArr = arrayFromTxt.map(i => i.split(';'));
  newArr.shift();

  for (let i = 0; i < newArr.length; i++) {
    newArr[i][6] = (+newArr[i][6] / 100000) + '';
    newArr[i][7] = (+newArr[i][7] / 100000) + '';
  }; // fix geolocation coordinates

  for (let i = 0; i < newArr.length; i++) {
    newArr[i] = [newArr[i][0], newArr[i][4], newArr[i][6], newArr[i][7]];
  }; // remove not used graphs

  for (let i = 0; i < newArr.length; i++) {
    if (+newArr[i][2] === 0 || +newArr[i][3] === 0) {
      newArr.splice(i, 1);
      i--;
    }
  }; // remove zero GPS coordinats


  for (let i = 0; i < newArr.length; i++) {
    /* eslint-disable */
    (newArr[i][1] === '?' || newArr[i][1] === '') ? newArr[i][1] = "Названия остановки нет в базе Минсктранс" : newArr[i][1];
  }; // replace unnamed stations with default text

  return newArr.map(x => {
    return {
      id: +x[0],
      name: x[1],
      lng: +x[2],
      lat: +x[3]
    }
  });
};

