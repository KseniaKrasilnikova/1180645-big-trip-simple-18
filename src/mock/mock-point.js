import {getRandomInteger} from '../utils';
import dayjs from 'dayjs';
import {OFFERS_TYPE} from '../const';

const generateDate = () => {
  const maxDaysGap = 50;
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);

  return dayjs().add(daysGap, 'day').toDate();
};

export const generatePoint = () => {
  const date = generateDate();

  return {
    "basePrice": getRandomInteger(1000, 20000),
    "dateFrom": generateDate(),
    "dateTo": generateDate(),
    "destination": getRandomInteger(0, 1000),
    "id": getRandomInteger(0, 1000),
    "offers": [1, 2, 3],
    "type": OFFERS_TYPE[getRandomInteger(0, OFFERS_TYPE.length-1)]
  };
};
