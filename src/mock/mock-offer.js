import {getRandomInteger} from '../utils.js';

const generateOfferTitle = () => {
  const titles = [
    'Order Uber',
    'Rent a car',
    'Add luggage',
    'Switch to comfort',
    'Add breakfast',
    'Book tickets',
    'Lunch in city',
    'Switch to comfort',
  ];

  const randomIndex = getRandomInteger(0, titles.length - 1);

  return titles[randomIndex];
};

export const generateOffer = (id) => ({
  id,
  'title': generateOfferTitle(),
  'price': getRandomInteger(0, 100)
});
