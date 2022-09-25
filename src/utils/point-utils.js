import dayjs from 'dayjs';
import {getRandomInteger} from './common';
import {OFFERS, POINTS_COUNT} from '../const';

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

function generateOffersArrayIds() {
  const ids = OFFERS.map((offer) => offer.id);
  const length = getRandomInteger(1, OFFERS.length);
  const result = [];
  for (let i = 0; i < length; i++) {
    result.push(ids[getRandomInteger(0, ids.length - 1)]);
    ids.splice(i, 1);
  }
  return result;
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

const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};

// Функция помещает задачи без даты в конце списка,
// возвращая нужный вес для колбэка sort
const getWeightForNullDate = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
};

// const sortPointUp = (pointA, pointB) => {
//   const weight = getWeightForNullDate(pointA.date, pointB.date);
//
//   return weight ?? dayjs(pointA.date).diff(dayjs(pointB.date));
// };

const sortPointDown = (pointA, pointB) => {
  const weight = getWeightForNullDate(pointA.dateFrom, pointB.dateFrom);

  return weight ?? dayjs(pointB.dateFrom).diff(dayjs(pointA.dateFrom));
};

const sortPointByPrice = (pointA, pointB) => pointA.basePrice - pointB.basePrice;

export {
  generateArray,
  getDayFromDate,
  getTimeFromDate,
  getYyyyMmDdTFromDate,
  getDMYTFromDate,
  shuffle,
  generateOffersArrayIds,
  isFutureEvent,
  updateItem,
  // sortPointUp,
  sortPointDown,
  sortPointByPrice
};
