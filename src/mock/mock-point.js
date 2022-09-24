import {getRandomInteger} from '../utils/common';
import dayjs from 'dayjs';
import {CITIES, POINT_TYPES} from '../const';

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

export const generatePoint = () => ({
  'basePrice': getRandomInteger(1000, 20000),
  'dateFrom': generateDate(),
  'dateTo': generateDate(),
  'destination': getRandomInteger(1, CITIES.length),
  'id': getRandomInteger(0, 1000),
  'type': POINT_TYPES[getRandomInteger(0, POINT_TYPES.length - 1)]
});
