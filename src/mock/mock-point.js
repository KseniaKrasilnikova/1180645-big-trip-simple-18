import {getRandomInteger} from '../utils/common';
import {generateArray} from '../utils/point-utils';
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

export const generatePoint = () => ({
  'basePrice': getRandomInteger(1000, 20000),
  'dateFrom': generateDate(),
  'dateTo': generateDate(),
  'destination': getRandomInteger(1, POINTS_COUNT),
  'id': getRandomInteger(0, 1000),
  'offers': generateArray(),
  'type': OFFERS_TYPE[getRandomInteger(0, OFFERS_TYPE.length - 1)]
});
