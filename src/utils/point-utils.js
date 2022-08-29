import dayjs from 'dayjs';
import {getRandomInteger} from './common';
import {POINTS_COUNT} from '../const';

const getDayFromDate = (date) => dayjs(date).format('D MMM');
const getTimeFromDate = (date) => dayjs(date).format('hh:mm');
const getYyyyMmDdTFromDate = (date) => dayjs(date).format('YYYY-MM-DDThh:mm');
const getDMYTFromDate = (date) => dayjs(date).format('MM/DD/YY hh:mm');

function shuffle(array) {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}

const generateArray = () => {
  const array = Array.from({length: POINTS_COUNT}, (_value, key) => key + 1);
  const shuffledArray = shuffle(array);
  const arrayLength = getRandomInteger(0, POINTS_COUNT - 5);
  for (let i = 0; i < POINTS_COUNT; i++) {
    array.push(i + 1);
  }
  return shuffledArray.slice(0, arrayLength);
};

const isFutureEvent = (date) => date && dayjs(date).isAfter(dayjs(), 'minute');

export {
  generateArray,
  getDayFromDate,
  getTimeFromDate,
  getYyyyMmDdTFromDate,
  getDMYTFromDate,
  shuffle,
  isFutureEvent
};
