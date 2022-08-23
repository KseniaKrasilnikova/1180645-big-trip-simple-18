import {getRandomInteger, shuffle} from '../utils';
import dayjs from 'dayjs';
import {OFFERS_TYPE, POINTS_COUNT} from '../const';

const generateDate = () => {
  const maxDaysGap = 50;
  const maxHourGap = 23;
  const maxMinuteGap = 5;

  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);
  const hourGap = getRandomInteger(-maxHourGap, maxHourGap);
  const minuteGap = getRandomInteger(0, maxMinuteGap) * 10;

  return dayjs().add(daysGap, 'day')
    .add(hourGap, 'hour')
    .set('minute', minuteGap)
    .toDate();
};

const generateArray = () => {
  const array = Array.from({length: POINTS_COUNT}, (_value, key) => key + 1);
  const shuffledArray = shuffle(array);
  const arrayLength = getRandomInteger(0, POINTS_COUNT - 5);
  for (let i = 0; i < POINTS_COUNT; i++) {
    array.push(i + 1)
  }
  return shuffledArray.slice(0, arrayLength);
}

export const generatePoint = () => {
  return {
    'basePrice': getRandomInteger(1000, 20000),
    'dateFrom': generateDate(),
    'dateTo': generateDate(),
    'destination': getRandomInteger(1, POINTS_COUNT),
    'id': getRandomInteger(0, 1000),
    'offers': generateArray(),
    'type': OFFERS_TYPE[getRandomInteger(0, OFFERS_TYPE.length - 1)]
  };
};
