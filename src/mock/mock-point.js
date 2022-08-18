import {getRandomInteger, getDayFromDate, getTimeFromDate} from '../utils';
import dayjs from 'dayjs';
import {OFFERS_TYPE} from '../const';


const generateDate = () => {
  const maxDaysGap = 50;
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);

  return dayjs().add(daysGap, 'day').toDate();
};

export const generatePoint = () => {
  const date = generateDate();
  const day = getDayFromDate(date);

  return {
    "basePrice": getRandomInteger(1000, 20000),
    "dateFrom": day,
    "dateTo": "2019-07-11T11:22:13.375Z",
    "destination": "",
    "id": "0",
    "offers": [1, 2, 3],
    "type": OFFERS_TYPE[getRandomInteger(0, OFFERS_TYPE.length-1)]
  };
};
