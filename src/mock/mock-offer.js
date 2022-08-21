import {getRandomInteger} from '../utils.js';

export const generateOffer = (id) => {
  return {
    id,
    "title": "Uw business class",
    "price": getRandomInteger(0, 100)
  }
};
